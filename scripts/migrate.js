/* eslint-disable no-console */
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const yaml = require('dumi/node_modules/js-yaml');

// 检查 ~demo 文件夹是否存在，存在则说明是来自 next 的合并
const tmpFolder = `~demo`;

if (fs.existsSync(tmpFolder)) {
  let demoFileCount = 0;
  let apiFileCount = 0;

  const files = glob
    .sync(path.join(tmpFolder, `components/**`))
    .filter(file => file.endsWith('.md'));
  console.log('存在 ~demo 文件夹，先做迁移', files.length, '个文件');

  files.forEach(file => {
    const filePath = file.split(path.sep).splice(1).join(path.sep);
    if (fs.statSync(filePath).isDirectory()) {
      return;
    }

    if (!filePath.startsWith('components')) {
      throw new Error('Tmp demo path not correct');
    }

    fs.ensureDirSync(path.dirname(filePath));
    if (filePath.endsWith('.en-US.md') || filePath.endsWith('.zh-CN.md')) {
      // 保留 meta 信息
      const md = fs.readFileSync(filePath, 'utf-8');
      const [, frontmatter] = md.match(/^(---[^]+?\n---)/);
      const legacyMD = fs.readFileSync(file, 'utf-8');
      fs.writeFileSync(filePath, legacyMD.replace(/^(---[^]+?\n---)/, frontmatter));
    } else if (filePath.startsWith('components/overview')) {
      // overview 文件不需要迁移
      return;
    } else {
      fs.copyFileSync(file, filePath);
    }

    if (filePath.includes('demo')) {
      demoFileCount += 1;
    } else {
      apiFileCount += 1;
    }
  });

  console.log('迁移完成，共迁移文件数：', apiFileCount, '个介绍文档', demoFileCount, '个 demo');
}

// 重新生成所有的 Demo 文件
const componentsPath = path.join(__dirname, '../components');
const components = fs
  .readdirSync(componentsPath)
  .filter(d => fs.existsSync(path.join(componentsPath, d, 'demo')));

components.forEach(component => {
  const demoPath = path.join(componentsPath, component, 'demo');
  const demos = fs.readdirSync(demoPath).filter(demo => demo.endsWith('.md'));
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
          'zh-CN': `<code src="./demo/${name}.tsx"${meta.debug ? ' debug' : ''}>${
            meta.title['zh-CN']
          }</code>`,
          'en-US': `<code src="./demo/${name}.tsx"${meta.debug ? ' debug' : ''}>${
            meta.title['en-US']
          }</code>`,
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

  if (!/cols: /.test(zh)) {
    zh = zh.replace(/(\n---)/, '\ndemo:\n  cols: 2$1');
  }

  if (!/cols: /.test(en)) {
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
    const extraMeta = Object.keys(code.meta).filter(
      key => !['title', 'order', 'debug'].includes(key),
    );

    if (extraMeta.length) {
      console.log('写入额外的 meta', code.meta);
      code.code = `/*\n${extraMeta.map(key => ` * ${key}: ${code.meta[key]}`).join('\n')}\n */\n\n${
        code.code
      }`;
    }

    let importReactContent = "import React from 'react';";

    const importReactReg = /import React(\D*)from 'react';\n/;
    const matchImportReact = code.code.match(importReactReg);
    if (matchImportReact) {
      [importReactContent] = matchImportReact;
      code.code = code.code.replace(importReactReg, '').trim();
    }
    fs.writeFileSync(
      path.join(demoPath, `${code.name}.tsx`),
      `${importReactContent}${code.code}\n`,
      'utf-8',
    );
    if (code.md.trim()) {
      fs.writeFileSync(path.join(demoPath, `${code.name}.md`), code.md, 'utf-8');
    } else {
      fs.unlinkSync(path.join(demoPath, `${code.name}.md`));
    }
  });
});
