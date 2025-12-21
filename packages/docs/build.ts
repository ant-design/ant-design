/* eslint-disable no-console */
import path from 'path';
import fs from 'fs-extra';
import { glob } from 'glob';

const ROOT_DIR = path.join(__dirname, '..', '..');
const OUTPUT_DIR = __dirname;

async function buildDocsPackage() {
  console.log('Building @ant-design/docs package...');

  // Clean up output directory (keep package.json)
  await fs.ensureDir(OUTPUT_DIR);

  // Remove all files except package.json and build.ts
  const files = await fs.readdir(OUTPUT_DIR);
  for (const file of files) {
    if (file !== 'package.json' && file !== 'build.ts' && file !== '.gitignore') {
      await fs.remove(path.join(OUTPUT_DIR, file));
    }
  }

  // 1. Copy docs/**/*.md (rename en-US.md to .md only)
  console.log('Copying docs/**/*.md...');
  const docsFiles = await glob('docs/**/*.en-US.md', {
    cwd: ROOT_DIR,
    absolute: false,
  });
  for (const file of docsFiles) {
    const srcPath = path.join(ROOT_DIR, file);
    // Rename en-US.md to .md
    const destFile = file.replace(/\.en-US\.md$/, '.md');
    const destPath = path.join(OUTPUT_DIR, destFile);
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(srcPath, destPath);
  }

  // 2. Copy components/*/index.en-US.md and rename to index.md
  console.log('Copying component index docs...');
  const componentIndexFiles = await glob('components/*/index.en-US.md', {
    cwd: ROOT_DIR,
    absolute: false,
  });
  for (const file of componentIndexFiles) {
    const srcPath = path.join(ROOT_DIR, file);
    // Rename index.en-US.md to index.md
    const destFile = file.replace(/index\.en-US\.md$/, 'index.md');
    const destPath = path.join(OUTPUT_DIR, destFile);
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(srcPath, destPath);
  }

  // 3. Copy components/*/*.en-US.md (tab documents) and rename to .md
  console.log('Copying component tab docs...');
  const allComponentMdFiles = await glob('components/*/*.en-US.md', {
    cwd: ROOT_DIR,
    absolute: false,
  });
  // Exclude index.en-US.md as it's already copied
  const componentTabFiles = allComponentMdFiles.filter(
    (file) => !file.match(/components\/[^/]+\/index\.en-US\.md$/),
  );
  for (const file of componentTabFiles) {
    const srcPath = path.join(ROOT_DIR, file);
    // Rename *.en-US.md to *.md
    const destFile = file.replace(/\.en-US\.md$/, '.md');
    const destPath = path.join(OUTPUT_DIR, destFile);
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(srcPath, destPath);
  }

  // 4. Copy components/*/demo/*.en-US.md and rename to .md
  console.log('Copying component demo docs...');
  const componentDemoFiles = await glob('components/*/demo/*.en-US.md', {
    cwd: ROOT_DIR,
    absolute: false,
  });
  for (const file of componentDemoFiles) {
    const srcPath = path.join(ROOT_DIR, file);
    // Rename *.en-US.md to *.md
    const destFile = file.replace(/\.en-US\.md$/, '.md');
    const destPath = path.join(OUTPUT_DIR, destFile);
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(srcPath, destPath);
  }

  // Create README.md
  const readmeContent = `# @ant-design/docs

Ant Design documentation files as Markdown.

## Installation

\`\`\`bash
npm install @ant-design/docs
\`\`\`

## Usage

\`\`\`javascript
import buttonDocs from '@ant-design/docs/components/button/index.md';
import gettingStarted from '@ant-design/docs/docs/react/getting-started.md';
\`\`\`

## Structure

- \`docs/\` - General documentation (react, blog, spec)
- \`components/\` - Component documentation files

## License

MIT
`;
  await fs.writeFile(path.join(OUTPUT_DIR, 'README.md'), readmeContent, 'utf8');

  console.log('✅ Build completed successfully!');
  console.log(`📦 Package output: ${OUTPUT_DIR}`);
}

buildDocsPackage().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
