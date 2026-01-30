/* eslint-disable no-console */
import path from 'path';
import fs from 'fs-extra';
import { glob } from 'glob';

const ROOT_DIR = path.join(__dirname, '..', '..');
const OUTPUT_DIR = __dirname;
const DIST_DIR = path.join(OUTPUT_DIR, 'dist');

interface DocMetadata {
  title?: string;
  group?: string;
  order?: number;
}

interface DocEntry {
  title: string;
  group: string;
  path: string;
  order: number;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): DocMetadata {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const fm = frontmatterMatch[1];

  // Extract title
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  const title = titleMatch?.[1]?.trim();

  // Extract group (handle both object and string format)
  let group: string | undefined;
  const groupObjectMatch = fm.match(/^group:\s*$/m);
  if (groupObjectMatch) {
    // Object format: group:\n  title: ...
    const groupTitleMatch = fm.match(/^group:\s*\n\s+title:\s*(.+)$/m);
    group = groupTitleMatch?.[1]?.trim();
  } else {
    // String format: group: ...
    const groupStringMatch = fm.match(/^group:\s*(.+)$/m);
    group = groupStringMatch?.[1]?.trim();
  }

  // Extract order
  const orderMatch = fm.match(/^order:\s*(\d+)$/m);
  const order = orderMatch ? Number.parseInt(orderMatch[1], 10) : undefined;

  return { title, group, order };
}

// Collect documentation entries from markdown files
async function collectDocEntries(
  files: string[],
  rootDir: string,
  pathTransform: (file: string) => string,
): Promise<DocEntry[]> {
  const entries: DocEntry[] = [];

  for (const file of files) {
    const srcPath = path.join(rootDir, file);
    const content = await fs.readFile(srcPath, 'utf-8');
    const metadata = parseFrontmatter(content);

    if (metadata.title) {
      entries.push({
        title: metadata.title,
        group: metadata.group || '', // Empty string for entries without group
        path: pathTransform(file),
        order: metadata.order ?? 999,
      });
    }
  }

  return entries;
}

// Generate table of contents markdown
function generateTOC(
  componentEntries: DocEntry[],
  reactEntries: DocEntry[],
  specEntries: DocEntry[],
): string {
  const sections = [
    { name: 'Components', entries: componentEntries },
    { name: 'Development', entries: reactEntries },
    { name: 'Design', entries: specEntries },
  ];

  let toc = '## Table of Contents\n\n';

  for (const section of sections) {
    if (section.entries.length === 0) continue;

    toc += `### ${section.name}\n\n`;

    // Separate entries with and without groups
    const entriesWithoutGroup = section.entries.filter((e) => e.group === '');
    const entriesWithGroup = section.entries.filter((e) => e.group !== '');

    // First, list entries without group (directly under section)
    if (entriesWithoutGroup.length > 0) {
      const sortedEntries = entriesWithoutGroup.sort((a, b) => a.order - b.order);
      for (const entry of sortedEntries) {
        toc += `- [${entry.title}](${entry.path})\n`;
      }
      toc += '\n';
    }

    // Then, list grouped entries
    if (entriesWithGroup.length > 0) {
      // Group entries by group field
      const groupMap = new Map<string, DocEntry[]>();
      for (const entry of entriesWithGroup) {
        if (!groupMap.has(entry.group)) {
          groupMap.set(entry.group, []);
        }
        groupMap.get(entry.group)!.push(entry);
      }

      // Sort groups and entries within each group
      const sortedGroups = Array.from(groupMap.entries()).sort((a, b) => {
        const minOrderA = Math.min(...a[1].map((e) => e.order));
        const minOrderB = Math.min(...b[1].map((e) => e.order));
        return minOrderA - minOrderB;
      });

      for (const [groupName, groupEntries] of sortedGroups) {
        toc += `#### ${groupName}\n\n`;

        // Sort entries by order
        const sortedEntries = groupEntries.sort((a, b) => a.order - b.order);

        for (const entry of sortedEntries) {
          toc += `- [${entry.title}](${entry.path})\n`;
        }
        toc += '\n';
      }
    }
  }

  return toc;
}

async function buildDocsPackage() {
  console.log('Building @ant-design/docs package...');

  // Clean up dist directory
  await fs.ensureDir(DIST_DIR);
  await fs.emptyDir(DIST_DIR);

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
    const destPath = path.join(DIST_DIR, destFile);
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
    const destPath = path.join(DIST_DIR, destFile);
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
    const destPath = path.join(DIST_DIR, destFile);
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
    const destPath = path.join(DIST_DIR, destFile);
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(srcPath, destPath);
  }

  // 5. Generate Table of Contents
  console.log('Generating Table of Contents...');

  const componentEntries = await collectDocEntries(componentIndexFiles, ROOT_DIR, (file) =>
    file.replace(/index\.en-US\.md$/, 'index.md').replace(/^/, 'dist/'),
  );

  const reactFiles = await glob('docs/react/*.en-US.md', {
    cwd: ROOT_DIR,
    absolute: false,
  });
  const reactEntries = await collectDocEntries(reactFiles, ROOT_DIR, (file) =>
    file.replace(/\.en-US\.md$/, '.md').replace(/^/, 'dist/'),
  );

  const specFiles = await glob('docs/spec/*.en-US.md', {
    cwd: ROOT_DIR,
    absolute: false,
  });
  const specEntries = await collectDocEntries(specFiles, ROOT_DIR, (file) =>
    file.replace(/\.en-US\.md$/, '.md').replace(/^/, 'dist/'),
  );

  const toc = generateTOC(componentEntries, reactEntries, specEntries);

  // Create README.md with TOC
  const readmeContent = `# @ant-design/docs

${toc}`;
  await fs.writeFile(path.join(OUTPUT_DIR, 'README.md'), readmeContent, 'utf8');

  console.log('✅ Build completed successfully!');
  console.log(`📦 Package output: ${DIST_DIR}`);
}

buildDocsPackage().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
