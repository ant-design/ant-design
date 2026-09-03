/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import ts from 'typescript';

/**
 * Regression guard for https://github.com/ant-design/ant-design/issues/58404.
 *
 * Ant Design's runtime source (`components/**`) must stay free of React class
 * components — the umbrella migration to function components is a tracked
 * invariant, not a one-off cleanup. This script makes it a checked one:
 *
 *   - Scans `components/**/*.{ts,tsx}` (excluding `__tests__`, `__snapshots__`
 *     and fixture-only test helpers).
 *   - Parses each file with the TypeScript AST and reports any class whose
 *     heritage is `(React.)?(Pure)?Component`.
 *   - Allows an explicit allowlist. Today that is only `Alert.ErrorBoundary`,
 *     which intentionally keeps class semantics: an error boundary needs
 *     `componentDidCatch` / `getDerivedStateFromError`, which have no function
 *     component equivalent. Revisit when React ships a functional alternative.
 *
 * Run via: `npm run lint:class` (part of the `lint` chain).
 */

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'components');

/**
 * Files allowed to keep class components, relative to `components/`.
 * Each entry must carry a reason — see the docblock above.
 */
const ALLOWLIST = new Map<string, string>([
  [
    'alert/ErrorBoundary.tsx',
    'Error boundary needs componentDidCatch / getDerivedStateFromError (no FC equivalent)',
  ],
]);

interface Violation {
  file: string;
  className: string;
  line: number;
  allowlisted: boolean;
}

function collectFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__' || entry.name === '__snapshots__' || entry.name === 'node_modules') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, out);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
}

function isClassComponent(node: ts.ClassDeclaration): boolean {
  return (node.heritageClauses ?? []).some((clause) => {
    if (clause.token !== ts.SyntaxKind.ExtendsKeyword) {
      return false;
    }
    return clause.types.some((type) => {
      const expr = type.expression;
      const text = expr.getText();
      return (
        text === 'Component' ||
        text === 'PureComponent' ||
        text.endsWith('.Component') ||
        text.endsWith('.PureComponent')
      );
    });
  });
}

function findClassComponents(file: string, sourceFile: ts.SourceFile): ts.ClassDeclaration[] {
  const found: ts.ClassDeclaration[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isClassDeclaration(node) && node.name && isClassComponent(node)) {
      found.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

function main(): void {
  if (!fs.existsSync(componentsDir)) {
    console.log(chalk.yellow('⚠️  components/ not found — run from the repo root. Skipping class-component check.'));
    process.exit(0);
  }

  const files = collectFiles(componentsDir);
  const violations: Violation[] = [];
  let scanned = 0;

  for (const file of files) {
    const sourceText = fs.readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
    const classes = findClassComponents(file, sourceFile);

    for (const cls of classes) {
      scanned += 1;
      const rel = path.relative(componentsDir, file).split(path.sep).join('/');
      const { line } = sourceFile.getLineAndCharacterOfPosition(cls.getStart(sourceFile));
      const allowlisted = ALLOWLIST.has(rel);
      violations.push({ file: rel, className: cls.name?.text ?? '(anonymous)', line: line + 1, allowlisted });
    }
  }

  const offenders = violations.filter((v) => !v.allowlisted);
  const skipped = violations.filter((v) => v.allowlisted);

  if (offenders.length > 0) {
    console.log(chalk.red(`❌  Found ${offenders.length} class component(s) in components/ source:`));
    for (const v of offenders) {
      console.log(chalk.red(`  - ${v.file}:${v.line}  class ${v.className} extends React.Component`));
    }
    console.log(chalk.red('\nClass components were migrated to function components (see #58404).'));
    console.log(chalk.red('Reintroducing one silently regresses the migration. Convert to FC or, if truly'));
    console.log(chalk.red('unavoidable, add the file to the ALLOWLIST in scripts/check-class-component.ts with a reason.'));
    process.exit(1);
  }

  for (const v of skipped) {
    console.log(chalk.cyan(`  ↳ allowlisted: ${v.file} (${ALLOWLIST.get(v.file)})`));
  }
  console.log(chalk.green(`✅  Class-component check passed. Scanned ${files.length} files, ${scanned} class component(s), ${skipped.length} allowlisted.`));
}

main();
