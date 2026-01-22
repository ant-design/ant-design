import fs from 'fs';
import path from 'path';
import type { IApi } from 'dumi';
import { glob } from 'glob';

interface DocItem {
  title: string;
  url: string;
  category: 'docs' | 'component' | 'semantic';
  content?: string;
}

interface ProcessResult {
  docs: DocItem[];
  components: DocItem[];
  semantics: DocItem[];
}

function processMarkdownFile(
  markdownFile: string,
  siteDir: string,
  targetArrays: ProcessResult,
): void {
  const mdPath = path.join(siteDir, markdownFile);

  const content = fs.readFileSync(mdPath, 'utf-8').trim();

  if (!content) {
    return;
  }

  // Extract title from first H1 heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(markdownFile, '.md');

  // Generate URL from file path (use .md suffix)
  let urlPath = markdownFile.replace(/\.md$/, '');
  // Remove /index suffix for component pages
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.replace(/\/index$/, '');
  }
  const url = `https://ant.design/${urlPath}.md`;

  // Categorize files
  if (/\/semantic.*\.md$/.test(markdownFile)) {
    // Component semantic files
    const componentName = path.basename(path.dirname(markdownFile));
    const semanticFileName = path.basename(markdownFile, '.md');
    // 提取 semantic 后缀（如 semantic_ribbon -> Ribbon）
    const semanticSuffix = semanticFileName.replace(/^semantic/, '').replace(/^_/, '');
    const displaySuffix = semanticSuffix
      ? semanticSuffix
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')
      : '';
    targetArrays.semantics.push({
      title: `${componentName}${displaySuffix ? ` ${displaySuffix}` : ''} Semantic`,
      url,
      category: 'semantic',
      content,
    });
  } else if (markdownFile.startsWith('components/')) {
    // Component documentation files
    const componentName = path.basename(markdownFile, '.md');
    targetArrays.components.push({
      title: componentName,
      url,
      category: 'component',
      content,
    });
  } else if (markdownFile.startsWith('docs/') || markdownFile.startsWith('changelog')) {
    // Documentation files
    targetArrays.docs.push({
      title,
      url,
      category: 'docs',
      content,
    });
  }
}

async function generateLLms(api: IApi) {
  const siteDir = api.paths.absOutputPath;

  // Ensure siteDir exists
  if (!fs.existsSync(siteDir)) {
    api.logger.error('Error: Output directory does not exist. Please run build first.');
    return;
  }

  // Find all markdown files in _site, excluding llms files
  const markdownFiles = await glob('**/*.md', {
    cwd: siteDir,
    ignore: ['llms*.md', 'llms*.txt'],
  });

  // Separate English and Chinese docs
  const englishDocs = markdownFiles.filter(
    (file) => !file.includes('-cn/') && !file.endsWith('-cn.md'),
  );

  const chineseDocs = markdownFiles.filter(
    (file) => file.includes('-cn/') || file.endsWith('-cn.md'),
  );

  const englishResult: ProcessResult = {
    docs: [],
    components: [],
    semantics: [],
  };

  const chineseResult: ProcessResult = {
    docs: [],
    components: [],
    semantics: [],
  };

  // Process English docs
  for (const markdownFile of englishDocs) {
    try {
      processMarkdownFile(markdownFile, siteDir, englishResult);
    } catch (error) {
      api.logger.warn(`Error processing ${markdownFile}:`, error);
    }
  }

  // Process Chinese docs
  for (const markdownFile of chineseDocs) {
    try {
      processMarkdownFile(markdownFile, siteDir, chineseResult);
    } catch (error) {
      api.logger.warn(`Error processing ${markdownFile}:`, error);
    }
  }

  const { docs, components, semantics } = englishResult;
  const { docs: docsCn, components: componentsCn, semantics: semanticsCn } = chineseResult;

  // Sort by title
  docs.sort((a, b) => a.title.localeCompare(b.title));
  components.sort((a, b) => a.title.localeCompare(b.title));
  semantics.sort((a, b) => a.title.localeCompare(b.title));
  docsCn.sort((a, b) => a.title.localeCompare(b.title));
  componentsCn.sort((a, b) => a.title.localeCompare(b.title));
  semanticsCn.sort((a, b) => a.title.localeCompare(b.title));

  // 1. Generate llms-semantic.md
  const semanticContent = [
    '# Ant Design Semantic Documentation',
    '',
    'This file contains aggregated semantic descriptions for all components.',
    '',
    `> Total ${semantics.length} components contain semantic descriptions`,
    '',
    ...semantics.flatMap((semantic) => [
      `# ${semantic.title}`,
      '',
      `Source: ${semantic.url}`,
      '',
      semantic.content || '',
      '',
      '---',
      '',
    ]),
  ].join('\n');

  // 2. Generate llms-semantic-cn.md
  const semanticContentCn = [
    '# Ant Design 组件语义化描述',
    '',
    '本文档包含了 Ant Design 组件库中所有组件的语义化描述信息。',
    '',
    `> 总计 ${semanticsCn.length} 个组件包含语义化描述`,
    '',
    ...semanticsCn.flatMap((semantic) => [
      `# ${semantic.title}`,
      '',
      `Source: ${semantic.url}`,
      '',
      semantic.content || '',
      '',
      '---',
      '',
    ]),
  ].join('\n');

  // 3. Generate llms-full.txt
  const fullContent = [
    '# Ant Design Component Documentation',
    '',
    'This file contains aggregated content from all component docs.',
    '',
    `> Total ${components.length} components`,
    '',
    ...components.flatMap((component) => [
      `## ${component.title}`,
      '',
      `Source: ${component.url}`,
      '',
      component.content || '',
      '',
      '---',
      '',
    ]),
  ].join('\n');

  // 4. Generate llms-full-cn.txt
  const fullContentCn = [
    '# Ant Design 组件文档',
    '',
    '本文件包含所有组件文档的聚合内容。',
    '',
    `> 总计 ${componentsCn.length} 个组件`,
    '',
    ...componentsCn.flatMap((component) => [
      `## ${component.title}`,
      '',
      `Source: ${component.url}`,
      '',
      component.content || '',
      '',
      '---',
      '',
    ]),
  ].join('\n');

  // 5. Generate llms.txt
  const llmsNavContent = [
    '# Ant Design - Enterprise-class React UI library',
    '',
    '- Ant Design, developed by Ant Group, is a React UI library that aims to provide a high-quality design language and development framework for enterprise-level backend management systems. It offers a rich set of components and design guidelines, helping developers build modern, responsive, and high-performance web applications.',
    '',
    '## Navigation',
    '',
    '- [Full Documentation (EN)](./llms-full.txt)',
    '- [Full Documentation (CN)](./llms-full-cn.txt)',
    '- [Semantic Documentation (EN)](./llms-semantic.md)',
    '- [Semantic Documentation (CN)](./llms-semantic-cn.md)',
    '',
    '## Docs (EN)',
    '',
    ...docs.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Docs (CN)',
    '',
    ...docsCn.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Component Docs (EN)',
    '',
    ...components.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Component Docs (CN)',
    '',
    ...componentsCn.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Semantic (EN)',
    '',
    ...semantics.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Semantic (CN)',
    '',
    ...semanticsCn.map(({ title, url }) => `- [${title}](${url})`),
    '',
  ].join('\n');

  // Write all files
  fs.writeFileSync(path.join(siteDir, 'llms-semantic.md'), semanticContent);
  fs.writeFileSync(path.join(siteDir, 'llms-semantic-cn.md'), semanticContentCn);
  fs.writeFileSync(path.join(siteDir, 'llms-full.txt'), fullContent);
  fs.writeFileSync(path.join(siteDir, 'llms-full-cn.txt'), fullContentCn);
  fs.writeFileSync(path.join(siteDir, 'llms.txt'), llmsNavContent);

  api.logger.event(
    `Generated llms.txt (navigation), llms-full.txt (${components.length} components), llms-full-cn.txt (${componentsCn.length} components), llms-semantic.md (${semantics.length} semantics), llms-semantic-cn.md (${semanticsCn.length} semantics)`,
  );
}

export default async function llmsPlugin(api: IApi) {
  api.modifyExportHTMLFiles(async (files) => {
    await generateLLms(api);
    return files;
  });
}
