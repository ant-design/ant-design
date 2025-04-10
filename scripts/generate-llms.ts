import path from 'path';
import fs from 'fs-extra';
import { glob } from 'glob';

async function generateLLms() {
  const cwd = process.cwd();
  const llmsDir = path.resolve(cwd, '..');
  const docsDir = path.join(cwd, 'docs');

  const docs = await glob('**/*.md', { cwd: docsDir });

  const docsIndex: Array<{ title: string; url: string }> = [];
  const docsBody: string[] = [];

  for (const markdown of docs) {
    const mdPath = path.join(docsDir, markdown);
    const isEnUS = mdPath.includes('en-US');

    if (!isEnUS) {
      const mdContent = fs.readFileSync(mdPath, 'utf-8');
      const mdName = markdown.replace(/\.md$/, '');
      const url = `https://umijs.org/${mdName}`; // 文档访问路径
      const regex = /^# (.+)$/m; // 匹配文档一级标题
      let title = mdName;
      let contentFromHeading = ''; // frontmatter 之后的文档内容

      const match = regex.exec(mdContent);
      if (match) {
        const heading = match[1].trim(); // 文档一级标题
        const startIndex = match.index;
        contentFromHeading = mdContent.slice(startIndex);
        title = heading;

        docsIndex.push({
          title,
          url,
        });

        docsBody.push(
          ['---', `Title: ${title}`, `URL: ${url}`, '---', '', `${contentFromHeading}`].join('\n'),
        );
      }
    }
  }
  const docsIndexContent = [
    '# Umi JS - 插件化的企业级前端应用框架',
    '',
    '- Umi是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。',
    '',
    '## Docs',
    '',
    ...docsIndex.map(({ title, url }) => `- [${title}](${url})`),
    '',
  ].join('\n');

  const docsBodyContent = docsBody.join('\n');

  fs.writeFileSync(path.join(llmsDir, '_site/llms.txt'), docsIndexContent);
  fs.writeFileSync(path.join(llmsDir, '_site/llms-full.txt'), docsBodyContent);
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
