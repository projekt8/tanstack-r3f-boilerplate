import * as path from 'node:path';
import { Project, ScriptTarget, SyntaxKind } from 'ts-morph';

/**
 * Helper: Fixes the generated React component using ts-morph
 *
 * @param filePath - Path to the generated React component
 * @param originalPathInFile - Original path of the GLB file in the component
 * @param componentName - Name of the component
 */
export async function fixGeneratedComponent(
  filePath: string,
  originalPathInFile: string,
  componentName: string
) {
  // Create a new ts-morph project
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ESNext,
    },
    // Skip loading other files to speed up and avoid issues
    skipAddingFilesFromTsConfig: true,
  });

  // Add the source file to the project
  const sourceFile = project.addSourceFileAtPath(filePath);

  // Shorten paths in the generated comment
  // The comment is usually attached to the first statement (imports)
  const firstStatement = sourceFile.getStatements()[0];
  if (firstStatement) {
    firstStatement.getLeadingCommentRanges().forEach((range) => {
      const text = range.getText();
      if (text.includes('Files:') && text.includes('>')) {
        const newText = text
          .replace(/(Files:\s+)(.+?)(\s+\[)/, (_, p1, p2, p3) => `${p1}${path.basename(p2)}${p3}`)
          .replace(/(>\s+)(.+?)(\s+\[)/, (_, p1, p2, p3) => `${p1}${path.basename(p2)}${p3}`);

        if (text !== newText) {
          sourceFile.replaceText([range.getPos(), range.getEnd()], newText);
        }
      }
    });
  }

  // Replace string paths with `modelUrl`
  // Look for any string literal that contains the transformed filename
  sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((literal) => {
    if (literal.getText().includes(originalPathInFile)) {
      literal.replaceWithText('modelUrl');
    }
  });

  // Add modelUrl import
  // default: import modelUrl from '@/assets/3d/[model]-transformed.glb?url';
  sourceFile.addImportDeclaration({
    defaultImport: 'modelUrl',
    moduleSpecifier: `@/assets/3d/${originalPathInFile}?url`,
  });

  // Check for useAnimations usage
  const usesAnimations = sourceFile.getImportDeclaration(
    (d) =>
      d.getModuleSpecifierValue() === '@react-three/drei' &&
      d.getNamedImports().some((ni) => ni.getName() === 'useAnimations')
  );

  // Add useModelAnimation import if needed
  if (usesAnimations) {
    sourceFile.addImportDeclaration({
      namedImports: ['useModelAnimation'],
      moduleSpecifier: '@/hooks/useModelAnimation',
    });
  }

  // Fix TS errors: import type { GLTF } from 'three-stdlib'
  const threeStdlibImport = sourceFile.getImportDeclaration('three-stdlib');
  if (threeStdlibImport) {
    const gltfImport = threeStdlibImport.getNamedImports().find((ni) => ni.getName() === 'GLTF');
    if (gltfImport) {
      gltfImport.setIsTypeOnly(true);
    }
  }

  // Fix `as GLTFResult` -> `as unknown as GLTFResult`
  sourceFile.getDescendantsOfKind(SyntaxKind.AsExpression).forEach((asExpr) => {
    const typeNode = asExpr.getTypeNode();
    if (typeNode && typeNode.getText() === 'GLTFResult') {
      // We replace the text to force the double cast
      asExpr.replaceWithText(`${asExpr.getExpression().getText()} as unknown as GLTFResult`);
    }
  });

  // Fix `JSX.IntrinsicElements` -> `React.JSX.IntrinsicElements`
  sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference).forEach((typeRef) => {
    if (typeRef.getText().startsWith('JSX.IntrinsicElements')) {
      typeRef.replaceWithText(
        typeRef.getText().replace('JSX.IntrinsicElements', 'React.JSX.IntrinsicElements')
      );
    }
  });

  // Fix `useRef<THREE.Group>()` -> `useRef<THREE.Group>(null)`
  sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((callExpr) => {
    const exprText = callExpr.getExpression().getText();
    if (exprText === 'useRef' || exprText === 'React.useRef') {
      if (callExpr.getArguments().length === 0) {
        callExpr.addArgument('null');
      }
    }
  });

  // Inject useModelAnimation hook if applicable
  if (usesAnimations) {
    const defaultExport = sourceFile
      .getExportedDeclarations()
      .get('default')?.[0]
      ?.asKind(SyntaxKind.FunctionDeclaration);

    if (defaultExport) {
      // Find where `useAnimations` is called: `const { actions } = useAnimations(...)`
      const useAnimationsStatement = defaultExport.getStatements().find((stmt) => {
        return (
          stmt.getKind() === SyntaxKind.VariableStatement &&
          stmt.getText().includes('useAnimations')
        );
      });

      if (useAnimationsStatement) {
        // Attempt to determine the default action name
        let defaultAction = 'Idle';
        const actionNameType = sourceFile.getTypeAlias('ActionName');

        if (actionNameType) {
          const typeNode = actionNameType.getTypeNode();
          if (typeNode?.getKind() === SyntaxKind.UnionType) {
            const firstLiteral = typeNode.asKind(SyntaxKind.UnionType)?.getTypeNodes()[0];
            if (firstLiteral?.getKind() === SyntaxKind.LiteralType) {
              defaultAction = firstLiteral.getText().replace(/['"]/g, '');
            }
          } else if (typeNode?.getKind() === SyntaxKind.LiteralType) {
            defaultAction = typeNode.getText().replace(/['"]/g, '');
          }
        }

        defaultExport.insertStatements(
          useAnimationsStatement.getChildIndex() + 1,
          `useModelAnimation('${componentName}', actions, '${defaultAction}');`
        );
      }
    }
  }

  // Remove animations from GLTFResult if GLTFAction is missing
  const hasGLTFAction =
    sourceFile.getTypeAlias('GLTFAction') || sourceFile.getInterface('GLTFAction');

  if (!hasGLTFAction) {
    const gltfResult = sourceFile.getTypeAlias('GLTFResult');
    if (gltfResult) {
      const typeNode = gltfResult.getTypeNode();

      if (typeNode) {
        if (typeNode.getKind() === SyntaxKind.IntersectionType) {
          typeNode
            .asKind(SyntaxKind.IntersectionType)
            ?.getTypeNodes()
            .forEach((node) => {
              if (node.getKind() === SyntaxKind.TypeLiteral) {
                node.asKind(SyntaxKind.TypeLiteral)?.getProperty('animations')?.remove();
              }
            });
        } else if (typeNode.getKind() === SyntaxKind.TypeLiteral) {
          typeNode.asKind(SyntaxKind.TypeLiteral)?.getProperty('animations')?.remove();
        }
      }
    }
  }

  await sourceFile.save();
}
