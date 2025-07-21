import path from 'path';
import fs from 'fs-extra';
import { glob } from 'glob';

async function generateLLms() {
  const cwd = process.cwd();
  const siteDir = path.resolve(cwd, '_site');
  const docsDir = ['components', 'docs'];

  const matchSuffix = '.en-US.md';

  // Ensure siteDir
  await fs.ensureDir(siteDir);

  const docs = await glob(`{${docsDir.join(',')}}/**/*.md`);
  const filteredDocs = docs.filter((doc) => doc.includes(matchSuffix));

  const docsIndex: Array<{ title: string; url: string }> = [];
  const docsBody: string[] = [];

  for (const markdown of filteredDocs) {
    const mdPath = path.join(cwd, markdown);

    const fsContent = (await fs.readFile(mdPath, 'utf-8')).trim();

    // e.g. title: Button -> Button
    const title = fsContent.match(/title:\s*(.*)/)?.[1].trim();

    if (!title) {
      console.log('MISS title, ignore:', mdPath);
      continue;
    }

    // URL
    let url = `https://ant.design/${markdown.replace(matchSuffix, '')}`;
    if (url.includes('/components/')) {
      url = url.replace('/index', '');
    }

    // Docs: title
    docsIndex.push({
      title,
      url,
    });

    // Docs: content
    const parsedContent = fsContent.replace(/^---[\s\S]*?---\n/, '').trim();

    const fullContent = [
      // Title
      '---',
      `Title: ${title}`,
      `URL: ${url}`,
      '---',
      '',
      // Content
      parsedContent,
      '',
    ].join('\n');

    docsBody.push(fullContent);
  }
  const docsIndexContent = [
    '# Ant Design - Enterprise-class React UI library',
    '',
    '- Ant Design, developed by Ant Group, is a React UI library that aims to provide a high-quality design language and development framework for enterprise-level backend management systems. It offers a rich set of components and design guidelines, helping developers build modern, responsive, and high-performance web applications.',
    '',
    '## Semantic Descriptions',
    '',
    '- [Ant Design Component Semantic Descriptions](https://ant.design/llms-semantic.md)',
    '',
    '## Docs',
    '',
    ...docsIndex.map(({ title, url }) => `- [${title}](${url})`),
    '',
  ].join('\n');

  const docsBodyContent = [
    '---',
    'Title: Ant Design Component Semantic Descriptions',
    'URL: https://ant.design/llms-semantic.md',
    '---',
    '',
    (await fs.readFile(path.join(siteDir, 'llms-semantic.md'), 'utf-8')).trim(),
    '',
    ...docsBody,
  ].join('\n');

  await fs.writeFile(path.join(siteDir, 'llms.txt'), docsIndexContent);
  await fs.writeFile(path.join(siteDir, 'llms-full.txt'), docsBodyContent);
  console.log('Generated llms.txt and llms-full.txt');
}
(async () => {
  if (require.main === module) {
    await generateLLms();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
