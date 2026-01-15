import fs from 'fs';
import path from 'path';
import type { IApi } from 'dumi';

type TokenMeta = {
  components?: Record<
    string,
    Array<{ token: string; desc?: string; descEn?: string; type?: string }>
  >;
  global?: Record<
    string,
    {
      desc?: string;
      descEn?: string;
      type?: string;
      name?: string;
      nameEn?: string;
    }
  >;
};

type TokenData = Record<string, { component?: Record<string, unknown>; global?: string[] }>;

/**
 * 路由信息
 */
interface RouteInfo {
  absPath: string;
  file: string;
}

/**
 * 内容过滤器上下文信息
 */
interface ContentFilterContext {
  route: RouteInfo;
  file: string;
  absPath: string;
  relPath: string;
  api: IApi;
}

/**
 * 插件配置选项
 */
export interface PluginOptions {
  /**
   * 路由过滤器：决定哪些路由需要生成 markdown
   * @param route - 路由信息
   * @returns 返回 true 表示处理该路由，false 表示跳过
   */
  routeFilter?: (route: RouteInfo) => boolean;

  /**
   * 内容过滤器数组：在处理内容前可以过滤或修改内容，按顺序链式应用
   * @param content - 原始 markdown 内容
   * @param context - 过滤器上下文信息，包含路由、文件路径、API 等
   * @returns 返回处理后的内容，如果返回 null 或空字符串则跳过该路由
   */
  contentFilters?: Array<(content: string, context: ContentFilterContext) => string | null>;

  /**
   * 是否启用清除 prettier-ignore 注释功能，默认为 true
   */
  enableClearPrettierIgnore?: boolean;

  /**
   * 是否启用替换 <code src> 标签功能，默认为 true
   */
  enableReplaceCodeSrc?: boolean;

  /**
   * 是否启用多语言块提取功能，默认为 true
   * 当启用时，会从 demo 的 .md 文件中提取对应语言的内容块（通过 ## zh-CN 或 ## en-US 标记）
   * 当禁用时，会使用完整的 .md 文件内容
   * 可以是布尔值，也可以是函数
   * - 布尔值：true 表示启用（使用自动检测的语言），false 表示禁用（使用完整内容）
   * - 函数：接收 demoMd 内容和文档路径，返回处理后的字符串（可以是空字符串，空字符串会被过滤）
   */
  enablePickLocaleBlock?: boolean | ((demoMd: string, docFileAbs: string) => string | undefined);
}

/**
 * 收集的 raw markdown 路由列表
 */
let RAW_MD_ROUTES: Array<RouteInfo> = [];

/**
 * 插件配置
 */
let PLUGIN_OPTIONS: PluginOptions = {};

/**
 * 记录 raw markdown 文档是否已经输出过
 */
let RAW_MD_EMITTED = false;

/**
 * Token 数据缓存
 * 避免重复读取文件，提升性能
 */
let TOKEN_CACHE: { meta: TokenMeta; data: TokenData } | null | undefined;

/**
 * 读取 JSON 文件，如果文件不存在或解析失败则返回 null
 *
 * @param abs - JSON 文件的绝对路径
 * @returns 解析后的 JSON 对象，如果文件不存在或解析失败则返回 null
 */
function readJsonIfExists<T>(abs: string): T | null {
  try {
    if (!fs.existsSync(abs)) return null;
    return JSON.parse(fs.readFileSync(abs, 'utf-8')) as T;
  } catch {
    return null;
  }
}

/**
 * 根据文档文件路径检测文档语言
 * 通过文件名后缀判断是中文还是英文文档
 *
 * @param docFileAbs - 文档文件的绝对路径
 * @returns 返回检测到的语言，默认为 'en-US'
 */
function detectDocLocale(docFileAbs: string): 'zh-CN' | 'en-US' {
  if (/-cn\.md$/i.test(docFileAbs) || /\.zh-CN\.md$/i.test(docFileAbs)) {
    return 'zh-CN';
  }
  return 'en-US';
}

/**
 * 清除 markdown 中的 prettier-ignore 注释
 * 用于清理文档内容，移除 `<!-- prettier-ignore -->` 格式的注释
 *
 * @param md - 原始 markdown 内容
 * @returns 清除 prettier-ignore 注释后的 markdown 内容
 */
function clearPrettierIgnore(md: string) {
  return md.replace(/<!--\s*prettier-ignore\s*-->\s*\n?/g, '');
}

/**
 * 替换 markdown 中的 "Semantic DOM" 部分的 code 标签为指向生成的 semantic.md 文件的链接
 *
 * @param md - 原始 markdown 内容
 * @param docFileAbs - 文档文件的绝对路径，用于生成链接路径
 * @returns 替换后的 markdown 内容
 */
function replaceSemanticDomSection(md: string, docFileAbs: string) {
  // 从文档路径推断组件路径（用于生成链接）
  // 例如：components/card/index.en-US.md -> components/card/semantic.md
  const componentPathMatch = docFileAbs.match(/components\/([^/]+)\//);
  if (!componentPathMatch) return md;

  const componentName = componentPathMatch[1];
  const isZhCN = /-cn\.md$/i.test(docFileAbs) || /\.zh-CN\.md$/i.test(docFileAbs);
  const componentPath = `components/${componentName}${isZhCN ? '-cn' : ''}`;

  // 匹配 <code src="./demo/_semantic*.tsx"> 标签并替换为 URL 地址
  return md.replace(/<code[^>]*_semantic[^>]*>.*?<\/code>/g, (match) => {
    // 从匹配的标签中提取文件名
    const demoIndex = match.indexOf('./demo/');
    if (demoIndex === -1) return match;
    const start = demoIndex + './demo/'.length;
    const end = match.indexOf('"', start);
    if (end === -1) return match;
    const semanticFile = match.substring(start, end);
    // 生成对应的 semantic.md 文件名：_semantic.tsx -> semantic.md, _semantic_meta.tsx -> semantic_meta.md
    const semanticMdFileName = semanticFile
      .replace(/^_semantic/, 'semantic')
      .replace(/\.tsx$/, '.md');
    return `https://ant.design/${componentPath}/${semanticMdFileName}`;
  });
}

/**
 * 从 markdown 内容中提取指定语言的块
 * 用于处理多语言文档，提取特定语言版本的标题块内容
 *
 * @param md - 原始 markdown 内容
 * @param locale - 目标语言
 * @returns 提取的指定语言块内容，如果未找到则返回整个文档的 trim 结果
 */
function pickLocaleBlock(md: string, locale: 'zh-CN' | 'en-US') {
  const other = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  const re = new RegExp(
    `(^|\\n)##\\s*${locale}\\s*\\n([\\s\\S]*?)(?=\\n##\\s*${other}\\s*\\n|$)`,
    'i',
  );
  const match = md.match(re);
  if (!match) return md.trim();
  return (match[2] ?? '').trim();
}

/**
 * 获取文本中最大连续反引号的数量
 * 用于确定代码块围栏所需的反引号数量，避免代码块内部的反引号与围栏冲突
 *
 * @param text - 待检查的文本内容
 * @returns 文本中最大连续反引号的数量
 */
function getMaxBacktickRun(text: string) {
  let max = 0;
  const re = /`+/g;
  let m: RegExpExecArray | null = re.exec(text);

  while (m) {
    if (m[0].length > max) max = m[0].length;
    m = re.exec(text);
  }
  return max;
}

/**
 * 将代码包装为 markdown 代码块格式
 * 自动根据代码内容中的反引号数量确定围栏长度，避免代码块溢出
 *
 * @param code - 待包装的代码内容
 * @param lang - 代码块的语言标识符（如 'tsx', 'js', 'css' 等），默认为空字符串
 * @returns 格式化后的 markdown 代码块
 */
function wrapFencedCode(code: string, lang = '') {
  const maxTicks = getMaxBacktickRun(code);
  const fence = '`'.repeat(Math.max(3, maxTicks + 1));
  const head = lang ? `${fence}${lang}` : fence;
  return `${head}\n${code.trimEnd()}\n${fence}`;
}

/**
 * 根据文件扩展名获取代码块语言标识
 * @param filePath - 文件路径
 * @returns 代码块语言标识
 */
function getCodeLang(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const langMap: Record<string, string> = {
    '.tsx': 'tsx',
    '.ts': 'typescript',
    '.jsx': 'jsx',
    '.js': 'javascript',
    '.vue': 'vue',
    '.css': 'css',
    '.less': 'less',
    '.scss': 'scss',
    '.sass': 'sass',
    '.json': 'json',
    '.html': 'html',
    '.md': 'markdown',
  };
  return langMap[ext] || ext.slice(1) || '';
}

/**
 * 替换 <code src> 标签为 markdown 代码块
 * 将 `<code src="./demo/basic.tsx" version="5.21.0">标题</code>` 替换为完整的 demo 代码块
 * 支持读取对应的 .md 文件作为 demo 描述，并根据文档语言提取对应语言块
 *
 * @param md - 原始 markdown 内容
 * @param docFileAbs - 文档文件的绝对路径，用于解析相对路径和检测语言
 * @param enablePickLocaleBlock - 是否启用多语言块提取，可以是布尔值或函数，默认为 true
 * @returns 替换后的 markdown 内容
 */
function replaceCodeSrcToMarkdown(
  md: string,
  docFileAbs: string,
  enablePickLocaleBlock:
    | boolean
    | ((demoMd: string, docFileAbs: string) => string | undefined) = true,
) {
  const docDir = path.dirname(docFileAbs);
  const locale = detectDocLocale(docFileAbs);

  // 匹配 <code src="./demo/basic.tsx">标题</code> 格式的标签
  const codeTagRE = /<code\s+[^>]*?src="([^"]+)"[^>]*>([\s\S]*?)<\/code>/g;

  return md.replace(codeTagRE, (full, src, title) => {
    try {
      const parts: string[] = [];
      const demoAbs = path.resolve(docDir, src);
      const demoTitle = String(title || '').trim() || path.basename(demoAbs);

      const code = fs.existsSync(demoAbs) ? fs.readFileSync(demoAbs, 'utf-8') : '';
      const demoMdAbs = demoAbs.replace(path.extname(demoAbs), '.md');
      let demoMd = fs.existsSync(demoMdAbs) ? fs.readFileSync(demoMdAbs, 'utf-8') : '';

      parts.push(`## ${demoTitle}`);

      if (demoMd && typeof enablePickLocaleBlock === 'function') {
        demoMd = enablePickLocaleBlock(demoMd, docFileAbs) || '';
      } else if (demoMd && enablePickLocaleBlock) {
        demoMd = pickLocaleBlock(demoMd, locale);
      } else {
        demoMd = demoMd.trim();
      }

      if (demoMd) {
        parts.push(demoMd);
      }

      if (code) {
        parts.push(wrapFencedCode(code, getCodeLang(demoAbs)));
      }

      return `${parts.join('\n\n')}\n`;
    } catch {
      return full;
    }
  });
}

/**
 * 从 components/version 目录读取 token 数据
 * 支持懒加载和缓存，避免重复读取文件
 *
 * @param api - Dumi API 实例，用于获取项目路径
 * @returns token 元数据和数据对象，如果文件不存在则返回 null
 */
function loadTokenFromRepo(api: IApi) {
  if (TOKEN_CACHE !== undefined) return TOKEN_CACHE;

  const cwd = api.paths.cwd;
  const metaPath = path.join(cwd, 'components', 'version', 'token-meta.json');
  const dataPath = path.join(cwd, 'components', 'version', 'token.json');

  const meta = readJsonIfExists<TokenMeta>(metaPath);
  const data = readJsonIfExists<TokenData>(dataPath);

  if (meta && data) {
    TOKEN_CACHE = { meta, data };
  } else {
    TOKEN_CACHE = null;
  }

  return TOKEN_CACHE;
}

/**
 * 转义 markdown 表格单元格中的特殊字符
 * 将换行符替换为空格，转义管道符，避免破坏表格结构
 *
 * @param v - 待转义的值
 * @returns 转义后的字符串
 */
function escapeMdCell(v: unknown) {
  return String(v ?? '')
    .replace(/\r?\n/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

/**
 * 规范化 token 值为字符串格式
 * 用于在 markdown 表格中显示 token 的默认值
 *
 * @param v - 待规范化的值
 * @returns 规范化后的字符串，null/undefined 返回空字符串
 */
function normalizeValue(v: unknown) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'string') return v.trim();
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

/**
 * 替换 <ComponentTokenTable component="Button" /> 标签为 markdown 表格
 * 处理流程：
 * 1. 为每个组件生成组件 Token 表格（包含 token 名称、描述、类型、默认值）
 * 2. 收集所有组件的全局 Token，合并去重后生成全局 Token 表格
 * 3. 支持多组件，用逗号分隔（如 component="Button,Input"）
 * 4. 原位替换原标签，保持文档顺序
 *
 * @param md - 原始 markdown 内容
 * @param docFileAbs - 文档文件的绝对路径，用于检测语言
 * @param api - Dumi API 实例，用于加载 token 数据
 * @returns 替换后的 markdown 内容
 */
function replaceComponentTokenTable(md: string, docFileAbs: string, api: IApi) {
  const tokens = loadTokenFromRepo(api);
  if (!tokens) return md;

  const { meta: tokenMeta, data: tokenData } = tokens;
  const locale = detectDocLocale(docFileAbs);

  const labels =
    locale === 'zh-CN'
      ? {
          componentTitle: '组件 Token',
          globalTitle: '全局 Token',
          name: 'Token 名称',
          desc: '描述',
          type: '类型',
          value: '默认值',
        }
      : {
          componentTitle: 'Component Token',
          globalTitle: 'Global Token',
          name: 'Token Name',
          desc: 'Description',
          type: 'Type',
          value: 'Default Value',
        };

  const re =
    /<ComponentTokenTable\s+[^>]*component="([^"]+)"[^>]*(?:\/>|>(?:\s*<\/ComponentTokenTable>)?)/g;

  return md.replace(re, (full, componentProp) => {
    const comp = String(componentProp || '').trim();
    if (!comp) return full;

    const comps = comp
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const out: string[] = [];
    // 使用 Set 收集所有组件的全局 Token，自动去重
    const globalTokenSet = new Set<string>();

    // 遍历每个组件，分别处理组件 Token 和收集全局 Token
    comps.forEach((comp) => {
      // 1. 处理组件 Token：为每个组件生成独立的表格
      const metaList = tokenMeta.components?.[comp];
      if (Array.isArray(metaList) && metaList.length > 0) {
        out.push(`## ${labels.componentTitle} (${comp})`);
        out.push(`| ${labels.name} | ${labels.desc} | ${labels.type} | ${labels.value} |`);
        out.push(`| --- | --- | --- | --- |`);

        metaList.forEach((item) => {
          const name = item.token;
          // 根据文档语言选择对应的描述文本
          const desc = locale === 'zh-CN' ? (item.desc ?? '') : (item.descEn ?? item.desc ?? '');
          const type = item.type ?? '';
          // 从 tokenData 中获取组件 Token 的默认值
          const value = normalizeValue(tokenData?.[comp]?.component?.[name]);
          out.push(
            `| ${escapeMdCell(name)} | ${escapeMdCell(desc)} | ${escapeMdCell(type)} | ${escapeMdCell(
              value,
            )} |`,
          );
        });

        out.push('');
      }

      // 2. 收集全局 Token：从每个组件的 global 数组中收集 token 名称
      const globalTokens = tokenData?.[comp]?.global;
      if (Array.isArray(globalTokens)) {
        globalTokens.forEach((token) => {
          globalTokenSet.add(token);
        });
      }
    });

    // 3. 处理全局 Token：合并所有组件的全局 Token，生成统一的表格
    if (globalTokenSet.size > 0) {
      const globalTokenList = Array.from(globalTokenSet).sort();
      if (globalTokenList.length > 0) {
        out.push(`## ${labels.globalTitle}`);
        out.push(`| ${labels.name} | ${labels.desc} | ${labels.type} | ${labels.value} |`);
        out.push(`| --- | --- | --- | --- |`);

        globalTokenList.forEach((tokenName) => {
          const meta = tokenMeta.global?.[tokenName];
          if (meta) {
            // 根据文档语言选择对应的描述文本
            const desc = locale === 'zh-CN' ? (meta.desc ?? '') : (meta.descEn ?? meta.desc ?? '');
            const type = meta.type ?? '';
            // 全局 Token 的默认值需要在运行时通过 getDesignToken() 计算
            // 在静态 markdown 生成阶段无法获取，因此留空
            const value = '';
            out.push(
              `| ${escapeMdCell(tokenName)} | ${escapeMdCell(desc)} | ${escapeMdCell(type)} | ${escapeMdCell(
                value,
              )} |`,
            );
          }
        });

        out.push('');
      }
    }

    // 如果没有生成任何内容，则保留原标签
    if (!out.length) return full;
    // 返回生成的 markdown 表格，前后添加换行确保格式正确
    return `\n\n${out.join('\n').trim()}\n\n`;
  });
}

/**
 * 输出处理后的 raw markdown 文件到构建输出目录
 * 仅在 production 环境下执行，确保每个文档只处理一次。
 * 对收集的路由进行处理：移除 prettier-ignore 注释、替换 `<code src>` 标签、
 * 替换 `<ComponentTokenTable />` 组件，然后将处理后的 markdown 写入输出目录
 *
 * @param api - Dumi API 实例，用于获取输出路径等配置
 */
function emitRawMd(api: IApi) {
  if (process.env.NODE_ENV !== 'production') return;
  if (RAW_MD_EMITTED) return;
  RAW_MD_EMITTED = true;

  const outRoot = api.paths.absOutputPath;

  RAW_MD_ROUTES.forEach((route) => {
    try {
      const { absPath, file } = route;
      const relPath = absPath.replace(/^\//, '');
      if (!relPath || !fs.existsSync(file)) return;

      // 应用路由过滤器
      if (PLUGIN_OPTIONS.routeFilter && !PLUGIN_OPTIONS.routeFilter(route)) {
        return;
      }

      let content = fs.readFileSync(file, 'utf-8');

      if (PLUGIN_OPTIONS.contentFilters && PLUGIN_OPTIONS.contentFilters.length > 0) {
        const filterContext: ContentFilterContext = {
          route,
          file,
          absPath,
          relPath,
          api,
        };

        for (const filter of PLUGIN_OPTIONS.contentFilters) {
          const filteredContent = filter(content, filterContext);
          if (filteredContent === null || filteredContent === '') {
            return;
          }
          content = filteredContent;
        }
      }

      // 处理步骤：
      // 1. 替换 Semantic DOM 部分为指向生成的 semantic.md 文件的链接
      content = replaceSemanticDomSection(content, file);
      // 2. 替换 <ComponentTokenTable /> 组件为 markdown 表格
      content = replaceComponentTokenTable(content, file, api);

      // 3. 清除 prettier-ignore 注释（可通过配置开关控制）
      if (PLUGIN_OPTIONS.enableClearPrettierIgnore !== false) {
        content = clearPrettierIgnore(content);
      }
      // 4. 替换 <code src> 标签为完整的代码块（可通过配置开关控制）
      if (PLUGIN_OPTIONS.enableReplaceCodeSrc !== false) {
        const enablePickLocaleBlock =
          PLUGIN_OPTIONS.enablePickLocaleBlock !== undefined
            ? PLUGIN_OPTIONS.enablePickLocaleBlock
            : true;
        content = replaceCodeSrcToMarkdown(content, file, enablePickLocaleBlock);
      }

      const outMd = path.join(outRoot, `${relPath}.md`);
      if (!fs.existsSync(outMd)) {
        fs.mkdirSync(path.dirname(outMd), { recursive: true });
        fs.writeFileSync(outMd, content, 'utf-8');
        api.logger.event(`Build ${relPath}.md`);
      }
    } catch (e) {
      api.logger.error(`Failed to emit raw markdown for ${route.file}:`, e);
    }
  });
}

/**
 * 负责在构建过程中处理 markdown 文档，生成 flattened markdown 文件到输出目录。
 * 主要功能包括：
 * 1. 收集所有 markdown 路由
 * 2. 在 HTML 文件导出阶段输出处理后的 raw markdown 文件
 *
 * @param api - Dumi API 实例
 * @param options - 插件配置选项
 */
export default async function rawMdPlugin(api: IApi) {
  // 注册配置键，允许用户在配置中使用 rawMd 键
  api.describe({
    key: 'rawMd',
    config: {
      schema(joi) {
        return joi.object({
          routeFilter: joi.function(),
          contentFilters: joi.array().items(joi.function()),
          enableClearPrettierIgnore: joi.boolean(),
          enableReplaceCodeSrc: joi.boolean(),
          enablePickLocaleBlock: joi.alternatives().try(joi.boolean(), joi.function()),
        });
      },
      onChange: api.ConfigChangeType.reload,
    },
  });

  const configOptions = api.userConfig.rawMd as PluginOptions | undefined;
  PLUGIN_OPTIONS = configOptions || {};

  api.modifyRoutes((routes) => {
    RAW_MD_ROUTES = Object.values(routes)
      .filter((r) => typeof r?.file === 'string' && r.file.endsWith('.md'))
      .filter((r) => typeof r?.absPath === 'string' && r.absPath && !r.absPath.includes(':'))
      .map((r) => ({ absPath: r.absPath, file: r.file as string }));
    return routes;
  });

  api.modifyExportHTMLFiles((files) => {
    emitRawMd(api);
    return files;
  });
}
