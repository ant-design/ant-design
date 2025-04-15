const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');
const glob = require('glob');

// 创建输出目录
const OUTPUT_DIR = {
  'en-US': path.resolve(__dirname, '../../docs/pdf/en-US'),
  'zh-CN': path.resolve(__dirname, '../../docs/pdf/zh-CN'),
};

// 确保输出目录存在
Object.values(OUTPUT_DIR).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 读取演示代码文件
async function loadDemoFile(demoPath, componentDir) {
  try {
    const fullPath = path.join(componentDir, demoPath);
    const content = await fs.promises.readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`无法读取演示文件: ${demoPath}`, error);
    return null;
  }
}

// 处理相对链接
function processLinks(content, lang) {
  // 替换组件文档链接
  content = content.replace(
    /\[([^\]]+)\]\(\/components\/([^/)]+)\/?([^)]*)\)/g,
    (match, text, component) => {
      return `[${text}](./${lang}/${component}.pdf)`;
    },
  );

  // 替换其他文档链接
  content = content.replace(/\[([^\]]+)\]\(\/docs\/([^)]+)\)/g, (match, text, docPath) => {
    return `[${text}](./${lang}/${docPath.replace(/\.md$/, '.pdf')})`;
  });

  return content;
}

// 处理代码演示部分
async function processDemoSection(content, componentDir) {
  const lines = content.split('\n');
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 匹配代码演示部分
    const demoMatch = line.match(/<code src="([^"]+)"([^>]*)>([^<]*)<\/code>/);

    if (demoMatch) {
      const [, demoPath, attrs, title] = demoMatch;

      // 获取属性
      const debug = attrs.includes('debug');
      const version = (attrs.match(/version="([^"]+)"/) || [])[1];

      // 读取演示代码
      const demoContent = await loadDemoFile(demoPath, componentDir);

      if (demoContent) {
        // 添加演示标题和属性
        processedLines.push('');
        processedLines.push(`### ${title || '演示'}`);
        if (version) {
          processedLines.push(`<span class="version">v${version}</span>`);
        }
        if (debug) {
          processedLines.push('<span class="debug">Debug</span>');
        }
        processedLines.push('');

        // 添加演示代码
        processedLines.push('```tsx');
        processedLines.push(demoContent);
        processedLines.push('```');
        processedLines.push('');
      }
    } else {
      processedLines.push(line);
    }
  }

  return processedLines.join('\n');
}

async function convertToPdf(mdPath) {
  try {
    // 确定语言版本
    const isEnglish = mdPath.includes('index.en-US.md');
    const lang = isEnglish ? 'en-US' : 'zh-CN';

    // 获取组件名称和目录
    const componentDir = path.dirname(mdPath);
    const componentName = path.basename(componentDir);

    // 读取原始内容
    const originalContent = await fs.promises.readFile(mdPath, 'utf-8');

    // 处理代码演示部分
    let processedContent = await processDemoSection(originalContent, componentDir);

    // 处理链接
    processedContent = processLinks(processedContent, lang);

    // 创建临时文件
    const tempFile = path.join(OUTPUT_DIR[lang], `${componentName}.temp.md`);
    await fs.promises.writeFile(tempFile, processedContent);

    // 配置选项
    const config = {
      path: tempFile,
      css: `
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
        }
        pre {
          background: #f6f8fa;
          padding: 16px;
          border-radius: 4px;
          font-size: 14px;
          line-height: 1.5;
          overflow-x: auto;
        }
        code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #f0f0f0;
          padding: 12px 8px;
        }
        th {
          background: #fafafa;
        }
        .version {
          color: #1677ff;
          background: #e6f4ff;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          margin-right: 8px;
        }
        .debug {
          color: #d48806;
          background: #fffbe6;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
        }
        h1, h2, h3, h4 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-weight: 600;
          line-height: 1.25;
        }
        a {
          color: #1677ff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `,
      pdf_options: {
        format: 'A4',
        margin: {
          top: '2cm',
          right: '2cm',
          bottom: '2cm',
          left: '2cm',
        },
        printBackground: true,
      },
      marked_options: {
        headerIds: true,
        smartypants: true,
        highlight(code) {
          return code;
        },
      },
      highlight_style: 'github',
      html_toc: true,
      language: lang,
    };

    // 转换为 PDF
    const pdf = await mdToPdf(config);

    if (pdf) {
      // 生成输出文件名
      const outputPath = path.join(OUTPUT_DIR[lang], `${componentName}.pdf`);

      // 写入文件
      fs.writeFileSync(outputPath, pdf.content);

      // 删除临时文件
      await fs.promises.unlink(tempFile);

      console.log(`✅ PDF 已生成: ${outputPath}`);
      return { componentName, lang };
    }
  } catch (error) {
    console.error(`❌ 转换失败 (${mdPath}):`, error);
    return null;
  }
}

// 创建索引页面
async function createIndexPage(convertedFiles) {
  const langs = ['en-US', 'zh-CN'];
  const titles = {
    'en-US': 'Ant Design Documentation PDF',
    'zh-CN': 'Ant Design 文档 PDF',
  };
  const descriptions = {
    'en-US': 'This page contains all the PDF versions of Ant Design documentation.',
    'zh-CN': '本页面包含所有 Ant Design 文档的 PDF 版本。',
  };

  for (const lang of langs) {
    const components = convertedFiles
      .filter((file) => file && file.lang === lang)
      .map((file) => file.componentName)
      .sort();

    const content = `---
title: ${titles[lang]}
---

# ${titles[lang]}

${descriptions[lang]}

## Components

${components.map((name) => `- [${name}](./pdf/${lang}/${name}.pdf)`).join('\n')}
`;

    const outputPath = path.join(path.dirname(OUTPUT_DIR[lang]), `index.${lang}.md`);
    await fs.promises.writeFile(outputPath, content);
    console.log(`✅ 索引页面已生成: ${outputPath}`);
  }
}

// 查找所有组件的文档
async function findComponentDocs() {
  const componentsDir = path.resolve(__dirname, '../../components');

  // 查找所有中英文文档
  const mdFiles = glob.sync(path.join(componentsDir, '**', 'index.*.md'));

  // 过滤出中英文文档
  return mdFiles.filter(
    (file) => file.includes('index.en-US.md') || file.includes('index.zh-CN.md'),
  );
}

// 主函数
async function main() {
  try {
    console.log('🔍 正在查找组件文档...');
    const mdFiles = await findComponentDocs();

    if (mdFiles.length === 0) {
      console.error('❌ 未找到任何组件文档');
      process.exit(1);
    }

    console.log(`📑 找到 ${mdFiles.length} 个文档文件`);

    // 转换所有文档
    const convertedFiles = [];
    for (const mdFile of mdFiles) {
      const componentName = path.dirname(mdFile).split(path.sep).pop();
      const lang = mdFile.includes('en-US') ? 'en-US' : 'zh-CN';
      console.log(`\n🔄 正在转换 ${componentName} (${lang})...`);
      const result = await convertToPdf(mdFile);
      if (result) {
        convertedFiles.push(result);
      }
    }

    // 创建索引页面
    await createIndexPage(convertedFiles);

    console.log('\n✨ 所有文档转换完成！');
    console.log(`📁 英文文档位置: ${OUTPUT_DIR['en-US']}`);
    console.log(`📁 中文文档位置: ${OUTPUT_DIR['zh-CN']}`);
  } catch (err) {
    console.error('❌ 处理过程中出错:', err);
    process.exit(1);
  }
}

main();
