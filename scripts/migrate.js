const fs = require('fs');
const path = require('path');
const yaml = require('dumi/node_modules/js-yaml');

const componentsPath = path.join(__dirname, '../components');
const components = fs
  .readdirSync(componentsPath)
  .filter(d => fs.existsSync(path.join(componentsPath, d, 'demo')));

components.forEach(component => {
  const demoPath = path.join(componentsPath, component, 'demo');
  const demos = fs.readdirSync(demoPath);
  const codes = demos
    .map(demo => {
      const mdPath = path.join(demoPath, demo);
      const md = fs.readFileSync(mdPath, 'utf-8');
      const [, frontmatter, content, code, extra] = md.match(
        /^(---[^]+?\n---)\s+([^]+?)?\s+(```(?:tsx|jsx)[^]+?\n```)([^]*)$/,
      );
      const meta = yaml.load(frontmatter.replace(/^---|---$/g, ''));
      const name = path.basename(demo, '.md');

      return {
        name,
        meta,
        html: {
          'zh-CN': `<code src="./demo/${name}.tsx">${meta.title['zh-CN']}</code>`,
          'en-US': `<code src="./demo/${name}.tsx">${meta.title['en-US']}</code>`,
        },
        md: content + extra,
        code: code.replace(/^```(tsx|jsx)\n|```$/g, ''),
      };
    })
    .sort((a, b) => a.meta.order - b.meta.order);
  const zhPath = path.join(componentsPath, component, 'index.zh-CN.md');
  const enPath = path.join(componentsPath, component, 'index.en-US.md');
  let zh = fs.readFileSync(zhPath, 'utf-8');
  let en = fs.readFileSync(enPath, 'utf-8');

  if (!/\ncols: /.test(zh)) {
    zh = zh.replace(/(\n---)/, '\ndemo:\n  cols: 2$1');
  }

  if (!/\ncols: /.test(en)) {
    en = en.replace(/(\n---)/, '\ndemo:\n  cols: 2$1');
  }

  console.log('写入', component, 'md...');
  fs.writeFileSync(
    zhPath,
    zh
      .replace(
        /(\n## api)/i,
        `
## 代码演示

${codes.map(code => code.html['zh-CN']).join('\n')}
$1`,
      )
      .replace(/\ncols: 2(.*?)(\n---)/, '$1\ndemo:\n  cols: 2$2')
      .replace(/\ncols: 1/, ''),
    'utf-8',
  );
  fs.writeFileSync(
    enPath,
    en
      .replace(
        /(\n## api)/i,
        `
## Examples

${codes.map(code => code.html['en-US']).join('\n')}
$1`,
      )
      .replace(/\ncols: 2(.*?)(\n---)/, '$1\ndemo:\n  cols: 2$2')
      .replace(/\ncols: 1/, ''),
    'utf-8',
  );

  console.log('写入', component, 'demo & demo md...');
  codes.forEach(code => {
    const extraMeta = Object.keys(code.meta).filter(key => !['title', 'order'].includes(key));

    if (extraMeta.length) {
      console.log('写入额外的 meta', code.meta);
      code.code = `/*\n${extraMeta.map(key => ` * ${key}: ${code.meta[key]}`).join('\n')}\n */\n\n${
        code.code
      }`;
    }

    fs.writeFileSync(path.join(demoPath, `${code.name}.tsx`), code.code, 'utf-8');
    if (code.md.trim()) {
      fs.writeFileSync(path.join(demoPath, `${code.name}.md`), code.md, 'utf-8');
    } else {
      fs.unlinkSync(path.join(demoPath, `${code.name}.md`));
    }
  });
});
