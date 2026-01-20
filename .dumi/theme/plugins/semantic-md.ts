import fs from 'fs';
import path from 'path';
import type { IApi } from 'dumi';

let COMPONENT_ROUTES: Array<{ absPath: string; componentName: string; outputPath: string }> = [];
let SEMANTIC_MD_EMITTED = false;

// 解析 locales 字符串片段为语义映射表
function extractSemantics(objContent: string): Record<string, string> {
  const result: Record<string, string> = {};
  const semanticMatches = objContent.matchAll(/['"]?([^'":\s]+)['"]?\s*:\s*['"]([^'"]+)['"],?/g);
  for (const match of semanticMatches) {
    const [, key, value] = match;
    if (key && value) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * 从 _semantic*.tsx 文件中提取语义信息
 * @param semanticFile - _semantic*.tsx 文件的绝对路径
 * @returns 包含中文和英文语义描述的对象，失败返回 null
 */
function extractLocaleInfoFromContent(content: string): {
  cn: Record<string, string>;
  en: Record<string, string>;
} | null {
  // 匹配 locales 对象定义
  const localesMatch = content.match(/const locales = \{([\s\S]*?)\};/);
  if (!localesMatch) return null;

  // 提取中文和英文的语义描述
  const cnMatch = content.match(/cn:\s*\{([\s\S]*?)\},?\s*en:/);
  if (!cnMatch) return null;

  const enMatch = content.match(/en:\s*\{([\s\S]*?)\}\s*[,;]/);
  if (!enMatch) return null;

  const cnContent = cnMatch[1];
  const enContent = enMatch[1];

  const cnSemantics = extractSemantics(cnContent);
  const enSemantics = extractSemantics(enContent);

  if (Object.keys(cnSemantics).length === 0) return null;

  return { cn: cnSemantics, en: enSemantics };
}

// 根据 import 路径找到模板文件的实际路径
function resolveTemplateFilePath(semanticFile: string, importPath: string): string | null {
  const basePath = path.resolve(path.dirname(semanticFile), importPath);
  const candidates = [
    basePath,
    `${basePath}.tsx`,
    `${basePath}.ts`,
    path.join(basePath, 'index.tsx'),
    path.join(basePath, 'index.ts'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

// 识别被 JSX 使用的模板组件导入
function parseTemplateUsage(content: string): Array<{ componentName: string; importPath: string }> {
  const results: Array<{ componentName: string; importPath: string }> = [];
  const importRegex = /import\s+([^;]+?)\s+from\s+['"]([^'"]+)['"];?/g;
  for (const match of content.matchAll(importRegex)) {
    const importClause = match[1].trim();
    const importPath = match[2].trim();
    if (!importPath.startsWith('.')) continue;

    const componentNames: string[] = [];
    if (importClause.startsWith('{')) {
      const names = importClause
        .replace(/[{}]/g, '')
        .split(',')
        .map((name) =>
          name
            .trim()
            .split(/\s+as\s+/)[0]
            .trim(),
        )
        .filter(Boolean);
      componentNames.push(...names);
    } else if (importClause.includes('{')) {
      const [defaultName, namedPart] = importClause.split(',');
      if (defaultName?.trim()) {
        componentNames.push(defaultName.trim());
      }
      const names = namedPart
        .replace(/[{}]/g, '')
        .split(',')
        .map((name) =>
          name
            .trim()
            .split(/\s+as\s+/)[0]
            .trim(),
        )
        .filter(Boolean);
      componentNames.push(...names);
    } else {
      componentNames.push(importClause);
    }

    for (const componentName of componentNames) {
      if (new RegExp(`<${componentName}\\b`).test(content)) {
        results.push({ componentName, importPath });
      }
    }
  }
  return results;
}

// 解析 ignoreSemantics 属性值
function parseIgnoreSemantics(propsString: string): string[] {
  const ignoreMatch = propsString.match(/ignoreSemantics\s*=\s*\{([\s\S]*?)\}/);
  if (!ignoreMatch) return [];
  const ignoreContent = ignoreMatch[1];
  return Array.from(ignoreContent.matchAll(/['"]([^'"]+)['"]/g)).map((match) => match[1]);
}

// 解析 singleOnly 属性值
function parseSingleOnly(propsString: string): boolean {
  const singleOnlyMatch = propsString.match(/singleOnly(\s*=\s*\{?([^}\s]+)\}?)?/);
  if (!singleOnlyMatch) return false;
  if (!singleOnlyMatch[1]) return true;
  const value = singleOnlyMatch[2];
  return value !== 'false';
}

// 抽取模板组件 JSX 的属性字符串
function extractTemplateProps(content: string, componentName: string): string {
  const start = content.indexOf(`<${componentName}`);
  if (start === -1) return '';
  let index = start + componentName.length + 1;
  const propsStart = index;
  let braceDepth = 0;
  let stringChar: string | null = null;

  for (; index < content.length; index += 1) {
    const ch = content[index];
    const prev = content[index - 1];

    if (stringChar) {
      if (ch === stringChar && prev !== '\\') {
        stringChar = null;
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      stringChar = ch;
      continue;
    }

    if (ch === '{') {
      braceDepth += 1;
      continue;
    }

    if (ch === '}') {
      if (braceDepth > 0) braceDepth -= 1;
      continue;
    }

    if (ch === '>' && braceDepth === 0) {
      return content.slice(propsStart, index).trim();
    }
  }

  return '';
}

// 应用 ignoreSemantics 与 singleOnly 过滤规则
function filterSemantics(
  semantics: Record<string, string>,
  options: { ignoreSemantics: string[]; singleOnly: boolean; templatePath: string },
): Record<string, string> {
  const ignoreSet = new Set(options.ignoreSemantics);
  const filteredEntries = Object.entries(semantics).filter(([key]) => !ignoreSet.has(key));

  if (options.singleOnly) {
    const singleOnlyKeys = new Set(['item', 'itemContent', 'itemRemove']);
    return Object.fromEntries(filteredEntries.filter(([key]) => !singleOnlyKeys.has(key)));
  }

  return Object.fromEntries(filteredEntries);
}

// 从模板组件的 locales 提取语义信息
function extractSemanticInfoFromTemplate(
  semanticFile: string,
  content: string,
): { cn: Record<string, string>; en: Record<string, string> } | null {
  const templates = parseTemplateUsage(content);
  if (templates.length === 0) return null;

  for (const template of templates) {
    const templatePath = resolveTemplateFilePath(semanticFile, template.importPath);
    if (!templatePath) continue;

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const templateLocales = extractLocaleInfoFromContent(templateContent);
    if (!templateLocales) continue;

    const propsString = extractTemplateProps(content, template.componentName);
    const ignoreSemantics = parseIgnoreSemantics(propsString);
    const singleOnly = parseSingleOnly(propsString);

    return {
      cn: filterSemantics(templateLocales.cn, {
        ignoreSemantics,
        singleOnly,
        templatePath,
      }),
      en: filterSemantics(templateLocales.en, {
        ignoreSemantics,
        singleOnly,
        templatePath,
      }),
    };
  }

  return null;
}

// 从 _semantic*.tsx 中提取语义信息
function extractSemanticInfo(semanticFile: string): {
  cn: Record<string, string>;
  en: Record<string, string>;
} | null {
  try {
    if (!fs.existsSync(semanticFile)) return null;

    const content = fs.readFileSync(semanticFile, 'utf-8');
    const localeInfo = extractLocaleInfoFromContent(content);
    if (localeInfo) return localeInfo;

    return extractSemanticInfoFromTemplate(semanticFile, content);
  } catch (error) {
    if (process.env.DEBUG) {
      console.error(`Failed to extract semantic info from ${semanticFile}:`, error);
    }
    return null;
  }
}

/**
 * 生成语义名称列表的 markdown 格式
 * @param semantics - 语义信息对象
 * @returns markdown 格式的语义名称列表
 */
function generateSemanticParts(semantics: Record<string, string>): string {
  const parts: string[] = [];
  for (const [name, desc] of Object.entries(semantics)) {
    // 将点号替换为连字符，匹配 DOM 中的实际 className 格式
    const className = name.replace(/\./g, '-');
    parts.push(`- ${name}（\`semantic-mark-${className}\`）: ${desc}`);
  }
  return parts.join('\n');
}

/**
 * 生成使用案例代码模板
 * @param componentName - 组件名（如 "button", "float-button"）
 * @param semanticSuffix - 语义文件后缀（如 "_group", "_input", "_search"）
 * @param semantics - 语义信息对象
 * @returns 使用案例代码
 */
function generateUsageExample(
  componentName: string,
  semanticSuffix: string,
  semantics: Record<string, string>,
): string {
  // 将组件名转换为 PascalCase（如 "float-button" -> "FloatButton"）
  const componentDisplayName = componentName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // 根据后缀生成组件名
  let tagName = componentDisplayName;
  if (semanticSuffix) {
    // 移除开头的下划线，然后转换为 PascalCase
    // 如 "_group" -> "Group", "_input" -> "Input", "_search" -> "Search"
    const suffixParts = semanticSuffix
      .replace(/^_/, '')
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const subComponentName = suffixParts.join('');
    tagName = `${componentDisplayName}.${subComponentName}`;
  }

  // 生成 classNames 对象
  const classNamesEntries: string[] = [];
  for (const [name] of Object.entries(semantics)) {
    // 将点号替换为连字符，匹配 DOM 中的实际 className 格式
    const className = name.replace(/\./g, '-');
    classNamesEntries.push(`    ${name}: "semantic-mark-${className}"`);
  }

  return `<${tagName}
  {...otherProps}
  classNames={{
${classNamesEntries.join(',\n')}
  }}
/>`;
}

/**
 * 从测试快照文件中读取组件的 HTML snapshot，并提取包含所有 semantic 元素的最小根元素
 * @param semanticFile - _semantic*.tsx 文件的绝对路径
 * @param cwd - 项目根目录
 * @returns HTML 字符串，失败返回 null
 */
function getComponentHTMLSnapshot(semanticFile: string, cwd: string): string | null {
  try {
    const relativePath = path.relative(cwd, semanticFile);
    const pathMatch = relativePath.match(/^components\/([^/]+)\/demo\/([^/]+)\.tsx$/);
    if (!pathMatch) return null;

    const [, componentName, fileName] = pathMatch;
    const snapshotPath = path.join(
      cwd,
      'components',
      componentName,
      '__tests__',
      '__snapshots__',
      'demo-semantic.test.tsx.snap',
    );

    if (!fs.existsSync(snapshotPath)) return null;

    const snapshotContent = fs.readFileSync(snapshotPath, 'utf-8');
    // 匹配快照 key：exports[`renders components/button/demo/_semantic.tsx correctly 1`] = `...`;
    const snapshotKeyPattern = `components/${componentName}/demo/${fileName}.tsx correctly`;
    const regex = new RegExp(
      `exports\\[\\\`[^\\\`]*${snapshotKeyPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\\\`]*\\\`\\]\\s*=\\s*\\\`([\\s\\S]*?)\\\`;`,
    );
    const snapshotMatch = snapshotContent.match(regex);
    if (!snapshotMatch) return null;

    let html = snapshotMatch[1].trim();

    // 处理 JSON 格式的快照：{ type: 'demo', html: '...' }
    if (html.startsWith('{') && html.includes('"html"')) {
      try {
        const parsed = JSON.parse(html);
        if (parsed.html) {
          html = parsed.html;
        }
      } catch {}
    }

    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const semanticElements = document.querySelectorAll('[class*="semantic-"]');

    if (semanticElements.length === 0) {
      return html;
    }

    // 向上查找包含所有 semantic 元素的最小根元素（通常是组件根元素，如 button）
    const firstSemantic = semanticElements[0] as Element;
    let rootElement: Element | null = firstSemantic;

    while (rootElement && rootElement.parentElement) {
      const parent: Element | null = rootElement.parentElement;
      // 遇到布局容器时停止，避免包含 SemanticPreview 的外层容器
      if (
        !parent ||
        parent.classList.contains('ant-row') ||
        parent.classList.contains('ant-col') ||
        parent.classList.contains('acss-') ||
        parent === document.body ||
        parent === document.documentElement
      ) {
        break;
      }

      // 检查父元素是否包含所有 semantic 元素
      let parentContainsAll = true;
      for (let i = 0; i < semanticElements.length; i++) {
        if (!parent.contains(semanticElements[i] as Element)) {
          parentContainsAll = false;
          break;
        }
      }
      if (parentContainsAll) {
        rootElement = parent;
      } else {
        break;
      }
    }

    return rootElement ? rootElement.outerHTML : html;
  } catch (error) {
    if (process.env.DEBUG) {
      console.warn(`[semantic-md] Failed to get HTML snapshot from ${semanticFile}:`, error);
    }
    return null;
  }
}

/**
 * 为每个组件生成 semantic*.md 文件
 * @param api - Dumi API 实例
 */
function emitSemanticMd(api: IApi) {
  if (process.env.NODE_ENV !== 'production') return;
  if (SEMANTIC_MD_EMITTED) return;
  SEMANTIC_MD_EMITTED = true;

  const outRoot = api.paths.absOutputPath;
  const cwd = api.paths.cwd;

  COMPONENT_ROUTES.forEach(({ componentName, outputPath, absPath }) => {
    try {
      const componentDir = path.join(cwd, 'components', componentName);
      const demoDir = path.join(componentDir, 'demo');

      if (fs.existsSync(demoDir)) {
        const demoFiles = fs.readdirSync(demoDir);
        // 查找所有 _semantic*.tsx 文件（如 _semantic.tsx, _semantic_group.tsx）
        const semanticFiles = demoFiles.filter(
          (demoFile) => demoFile.startsWith('_semantic') && demoFile.endsWith('.tsx'),
        );

        semanticFiles.forEach((semanticFile) => {
          const semanticFilePath = path.join(demoDir, semanticFile);
          const semanticInfo = extractSemanticInfo(semanticFilePath);

          if (!semanticInfo) {
            if (process.env.DEBUG) {
              console.warn(
                `[semantic-md] Failed to extract semantic info from ${semanticFilePath}`,
              );
            }
          }

          // 生成对应的 markdown 文件名：_semantic.tsx -> semantic.md, _semantic_group.tsx -> semantic_group.md
          const semanticSuffix = semanticFile.replace(/^_semantic/, '').replace(/\.tsx$/, '');
          const semanticMdFileName = `semantic${semanticSuffix}.md`;
          const semanticMdPath = path.join(outRoot, outputPath, semanticMdFileName);
          const semanticMdDir = path.dirname(semanticMdPath);

          if (!fs.existsSync(semanticMdDir)) {
            fs.mkdirSync(semanticMdDir, { recursive: true });
          }

          // 根据路由路径判断语言（-cn 后缀表示中文）
          const isZhCN = absPath.includes('-cn');
          let semantics: Record<string, string> = {};
          if (semanticInfo) {
            semantics = isZhCN ? semanticInfo.cn : semanticInfo.en;
          }

          const displayName = componentName
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');

          const titleSuffix = semanticSuffix
            ? semanticSuffix
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join('.')
            : '';

          const parts = [
            `## ${displayName}${titleSuffix ? `${titleSuffix}` : ''}`,
            '',
            '### Semantic Parts',
            '',
          ];

          if (Object.keys(semantics).length > 0) {
            parts.push(generateSemanticParts(semantics));
            parts.push('');
            parts.push(`### ${isZhCN ? '使用案例' : 'Usage Example'}`);
            parts.push('');
            parts.push('```tsx');
            parts.push(generateUsageExample(componentName, semanticSuffix, semantics));
            parts.push('```');
            parts.push('');
            parts.push('### Abstract DOM Structure');
            parts.push('');

            const htmlSnapshot = semanticInfo
              ? getComponentHTMLSnapshot(semanticFilePath, cwd)
              : null;

            if (htmlSnapshot) {
              parts.push('```html');
              parts.push(htmlSnapshot);
              parts.push('```');
            }
          }

          const content = `${parts.join('\n')}\n`;
          fs.writeFileSync(semanticMdPath, content, 'utf-8');
        });
      }
    } catch (e) {
      api.logger.error(`Failed to generate semantic md for ${componentName}:`, e);
    }
  });
}

/**
 * Semantic markdown 生成插件
 * @param api - Dumi API 实例
 */
export default async function semanticMdPlugin(api: IApi) {
  // 收集组件路由信息（过滤出 /components/* 和 /components/*-cn 路由）
  api.modifyRoutes((routes) => {
    COMPONENT_ROUTES = Object.values(routes)
      .filter((r) => typeof r?.absPath === 'string' && r.absPath && !r.absPath.includes(':'))
      .filter((r) => {
        const match = r.absPath.match(/^\/components\/([^/]+)\/?$/);
        return !!match;
      })
      .map((r) => {
        const match = r.absPath.match(/^\/components\/([^/]+)\/?$/);
        const fullComponentName = match![1];
        // 移除 -cn 后缀获取基础组件名
        const baseComponentName = fullComponentName.replace(/-cn$/, '');
        const outputPath = `components/${fullComponentName}`;

        return {
          absPath: r.absPath,
          componentName: baseComponentName,
          outputPath,
        };
      });

    return routes;
  });

  // 在 HTML 文件导出阶段生成 semantic.md 文件
  api.modifyExportHTMLFiles((files) => {
    emitSemanticMd(api);
    return files;
  });
}
