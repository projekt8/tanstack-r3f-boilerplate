import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { program } from 'commander';
import { fixGeneratedComponent } from './fix-gltfjsx-component';

interface OptimizeOptions {
  input: string;
  output: string;
  jsx: string;
}

/**
 * Setup CLI parameters
 *
 * @param input - Input folder for raw GLB files
 * @param output - Output folder for optimized GLB files
 * @param jsx - Output folder for React components
 */
program
  .option('-i, --input <path>', 'Input folder for raw GLB files', 'src/assets/3d')
  .option('-o, --output <path>', 'Output folder for optimized GLB files', 'src/assets/3d')
  .option('-j, --jsx <path>', 'Output folder for React components', 'src/components/r3f')
  .parse(process.argv);

const options = program.opts<OptimizeOptions>();

/**
 * Helper: Formats bytes to Megabytes (string)
 *
 */
const getMB = (filePath: string): string => {
  try {
    return (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
  } catch {
    return '0';
  }
};

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

  // Get all GLB files in the input directory
  const files = fs
    .readdirSync(options.input)
    .filter((f) => f.match(/\.(glb|gltf)$/i) && !f.includes('-transformed'));

  console.log(
    `\n--- 🚀 Starting Batch Optimization (${files.length} files in "${options.input}") ---\n`
  );

  // Process each file
  for (const file of files) {
    const fileName = path.parse(file).name;
    const inputPath = path.join(options.input, file);

    // Generate component name (PascalCase)
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
      // Expected transformed name
      const expectedTransformedName = `${fileName}-transformed.glb`;

      // Potential paths for the transformed GLB
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

      // Run gltfjsx and transform the model
      execSync(`npx gltfjsx "${inputPath}" -o "${jsxOutput}" --types --exportdefault --transform`, {
        stdio: ['ignore', 'ignore', 'inherit'],
      });

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
        await fixGeneratedComponent(jsxOutput, expectedTransformedName, `${componentName}Model`);

        // Lint and format the generated component
        execSync(`npm run lint:fix -- "${jsxOutput}"`);
        execSync(`npm run format -- --write "${jsxOutput}"`);

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
