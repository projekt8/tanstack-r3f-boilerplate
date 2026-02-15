import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { program } from 'commander';

interface OptimizeOptions {
  input: string;
  output: string;
  jsx: string;
}

/**
 * Setup CLI parameters
 */
program
  .option('-i, --input <path>', 'Input folder for raw GLB files', 'src/assets/3d')
  .option('-o, --output <path>', 'Output folder for optimized GLB files', 'public/assets/3d')
  .option('-j, --jsx <path>', 'Output folder for React components', 'src/components/r3f')
  .parse(process.argv);

const options = program.opts<OptimizeOptions>();

/**
 * Helper: Formats bytes to Megabytes (string)
 */
const getMB = (filePath: string): string => {
  try {
    return (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
  } catch {
    return '0';
  }
};

/**
 * Helper: Fixes the generated React component
 * 1. Updates the model path to include /assets/3d/
 * 2. Initializes useRef with null to prevent TS errors
 * 3. Fixes TypeScript errors
 */
function fixGeneratedComponent(filePath: string, originalPathInFile: string, newPath: string) {
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Could not read generated component file at ${filePath}`);
    return;
  }

  // Fix model path
  const pathRegex = new RegExp(`(['"])([^'"]*${originalPathInFile})(['"])`, 'g');

  content = content.replace(pathRegex, (_match, quote) => {
    return `${quote}${newPath}${quote}`;
  });

  // Shorten paths in comments to just filenames (only in Files and Command lines)
  content = content.replace(/\/\*[\s\S]*?\*\//, (comment) => {
    return comment
      .split('\n')
      .map((line) => {
        if (line.trim().startsWith('Files:')) {
          return line.replace(/([\w\-./\\:]+[\\/])([\w-]+\.(?:glb|gltf|tsx))/g, '$2');
        }
        return line;
      })
      .join('\n');
  });

  // Fix TypeScript errors
  content = content
    .replace("import { GLTF } from 'three-stdlib'", "import type { GLTF } from 'three-stdlib'")
    .replace(/as GLTFResult/g, 'as unknown as GLTFResult')
    .replace(/JSX\.IntrinsicElements/g, 'React.JSX.IntrinsicElements')
    .replace(/useRef<THREE.Group>\(\)/g, 'useRef<THREE.Group>(null)');

  if (!content.includes('interface GLTFAction') && !content.includes('type GLTFAction')) {
    content = content.replace(/animations: GLTFAction\[\]/g, 'animations: THREE.AnimationClip[]');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Process all GLB files in the input directory
 */
async function processModels() {
  // Ensure directories exist
  [options.output, options.jsx].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Check input directory
  if (!fs.existsSync(options.input)) {
    console.error(`❌ Input directory not found: ${options.input}`);
    process.exit(1);
  }

  const files = fs.readdirSync(options.input).filter((f) => f.match(/\.(glb|gltf)$/i));

  console.log(
    `\n--- 🚀 Starting Batch Optimization (${files.length} files in "${options.input}") ---\n`
  );

  for (const file of files) {
    const fileName = path.parse(file).name;
    const inputPath = path.join(options.input, file);

    // Component name logic (PascalCase)
    const componentName = fileName
      .split(/[-_]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    // Output component file path
    const componentFileName = `${componentName}Model.tsx`;
    const jsxOutput = path.join(options.jsx, componentFileName);

    const sizeBefore = getMB(inputPath);

    try {
      /**
       * Construct gltfjsx flags
       * Options:
       *   --output, -o        Output file name/path
       *   --types, -t         Add Typescript definitions
       *   --keepnames, -k     Keep original names
       *   --keepgroups, -K    Keep (empty) groups, disable pruning
       *   --bones, -b         Lay out bones declaratively (default: false)
       *   --meta, -m          Include metadata (as userData)
       *   --shadows, s        Let meshes cast and receive shadows
       *   --printwidth, w     Prettier printWidth (default: 120)
       *   --precision, -p     Number of fractional digits (default: 3)
       *   --draco, -d         Draco binary path
       *   --root, -r          Sets directory from which .gltf file is served
       *   --instance, -i      Instance re-occuring geometry
       *   --instanceall, -I   Instance every geometry (for cheaper re-use)
       *   --exportdefault, -E Use default export
       *   --transform, -T     Transform the asset for the web (draco, prune, resize)
       *     --resolution, -R  Resolution for texture resizing (default: 1024)
       *     --keepmeshes, -j  Do not join compatible meshes
       *     --keepmaterials, -M Do not palette join materials
       *     --format, -f      Texture format (default: "webp")
       *     --simplify, -S    Mesh simplification (default: false)
       *       --ratio         Simplifier ratio (default: 0)
       *       --error         Simplifier error threshold (default: 0.0001)
       *   --console, -c       Log JSX to console, won't produce a file
       *   --debug, -D         Debug output
       */
      const flags = [
        `"${inputPath}"`,
        `-o "${jsxOutput}"`,
        '--types',
        '--exportdefault',
        '--transform',
      ];

      const expectedTransformedName = `${fileName}-transformed.glb`;

      const potentialPaths = [
        path.join(process.cwd(), expectedTransformedName),
        path.join(path.dirname(jsxOutput), expectedTransformedName),
        path.join(path.dirname(inputPath), expectedTransformedName),
      ];

      // Cleanup existing files to prevent stale state
      potentialPaths.forEach((p) => {
        if (fs.existsSync(p)) {
          try {
            fs.unlinkSync(p);
          } catch (e) {
            /* ignore */
          }
        }
      });

      // Filter out empty strings from flags
      const command = `npx gltfjsx ${flags.filter(Boolean).join(' ')}`;

      // Execute npx gltfjsx
      execSync(command, { stdio: ['ignore', 'ignore', 'inherit'] });

      // Identify the generated GLB
      const foundPath = potentialPaths.find((p) => fs.existsSync(p));

      if (foundPath) {
        const finalGlbPath = path.join(options.output, expectedTransformedName);

        // Ensure parent dir exists (already done above but good practice)
        if (!fs.existsSync(path.dirname(finalGlbPath))) {
          fs.mkdirSync(path.dirname(finalGlbPath), { recursive: true });
        }

        fs.renameSync(foundPath, finalGlbPath);

        const sizeAfter = getMB(finalGlbPath);
        const savings = (100 - (Number(sizeAfter) / Number(sizeBefore)) * 100).toFixed(1);

        // Fix the generated component to point to the new location in /assets/3d/
        fixGeneratedComponent(
          jsxOutput,
          expectedTransformedName,
          `/assets/3d/${expectedTransformedName}`
        );

        console.log(
          `✅ ${file.padEnd(30)} | ${sizeBefore.padStart(5)}MB -> ${sizeAfter}MB (-${savings}%)`
        );
      } else {
        console.warn(
          `⚠️ Could not find expected transformed GLB (${expectedTransformedName}). Checked: ${potentialPaths.join(', ')}`
        );
      }
    } catch (err) {
      const error = err as Error;
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  console.log(
    `\n--- ✨ Model Optimization Done (${files.length} files in "${options.output}") ---\n`
  );
}

processModels().catch((err) => console.error(err));
