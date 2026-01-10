import fs from 'fs';
import path from 'path';
import type { IApi } from 'dumi';

/**
 * 收集的 raw markdown 路由列表
 */
let RAW_MD_ROUTES: Array<{ absPath: string; file: string }> = [];

/**
 * 记录 raw markdown 文档是否已经输出过
 */
let RAW_MD_EMITTED = false;

/**
 * 移除 markdown 中的 prettier-ignore 注释
 * 用于清理文档内容，移除 `<!-- prettier-ignore -->` 格式的注释
 *
 * @param md - 原始 markdown 内容
 * @returns 移除 prettier-ignore 注释后的 markdown 内容
 */
function stripPrettierIgnore(md: string) {
  return md.replace(/<!--\s*prettier-ignore\s*-->\s*\n?/g, '');
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
 * 将 markdown 中的 `<code src>` 标签展开为完整的 markdown 内容
 * 处理 `<code src="./demo/basic.tsx" version="5.21.0">语法糖</code>` 格式的标签，
 * 读取对应的代码文件和说明文档，生成包含标题、版本、说明和代码的完整 markdown 块
 *
 * @param md - 包含 `<code src>` 标签的 markdown 内容
 * @param docFileAbs - 当前文档文件的绝对路径，用于解析相对路径的代码文件
 * @returns 展开后的 markdown 内容，`<code src>` 标签被替换为完整的 markdown 块
 */
function expandCodeSrcToMarkdown(md: string, docFileAbs: string) {
  const docDir = path.dirname(docFileAbs);
  const locale = detectDocLocale(docFileAbs);

  // <code src="./demo/basic.tsx" version="5.21.0">语法糖</code>
  const codeTagRE = /<code\s+([^>]*?)\s*src="([^"]+)"([^>]*)>([\s\S]*?)<\/code>/g;

  /**
   * 从属性字符串中提取指定属性值
   *
   * @param attrs - 属性字符串
   * @param name - 要提取的属性名
   * @returns 属性值，如果不存在则返回 undefined
   */
  const getAttr = (attrs: string, name: string) => {
    const m = attrs.match(new RegExp(`${name}="([^"]+)"`));
    return m?.[1];
  };

  return md.replace(codeTagRE, (full, before, src, after, title) => {
    try {
      const attrs = `${before || ''} ${after || ''}`;
      const version = getAttr(attrs, 'version');

      const srcNormalized =
        src.endsWith('.tsx') || src.endsWith('.ts') || src.endsWith('.jsx') || src.endsWith('.js')
          ? src
          : `${src}.tsx`;

      const demoAbs = path.resolve(docDir, srcNormalized);
      const demoMdAbs = demoAbs.replace(/\.(t|j)sx?$/, '.md');

      const code = fs.existsSync(demoAbs) ? fs.readFileSync(demoAbs, 'utf-8') : '';
      let demoMd = fs.existsSync(demoMdAbs) ? fs.readFileSync(demoMdAbs, 'utf-8') : '';

      const demoTitle = String(title || '').trim() || path.basename(demoAbs);
      const parts: string[] = [];

      parts.push(`## ${demoTitle}`);

      if (version) {
        parts.push(`> version: ${version}`);
      }

      if (demoMd) {
        demoMd = stripPrettierIgnore(demoMd);
        demoMd = pickLocaleBlock(demoMd, locale);
        if (demoMd) parts.push(demoMd);
      }

      if (code) {
        parts.push(wrapFencedCode(code, 'tsx'));
      }

      return `${parts.join('\n\n')}\n`;
    } catch {
      return full;
    }
  });
}

/**
 * 输出处理后的 raw markdown 文件到构建输出目录
 * 仅在 production 环境下执行，确保每个文档只处理一次。
 * 对收集的路由进行处理：移除 prettier-ignore 注释、展开 `<code src>` 标签，
 * 然后将处理后的 markdown 写入输出目录
 *
 * @param api - Dumi API 实例，用于获取输出路径等配置
 */
function emitRawMd(api: IApi) {
  if (process.env.NODE_ENV !== 'production') return;
  if (RAW_MD_EMITTED) return;
  RAW_MD_EMITTED = true;

  const outRoot = api.paths.absOutputPath;

  RAW_MD_ROUTES.forEach(({ absPath, file }) => {
    try {
      const relPath = absPath.replace(/^\//, '');
      if (!relPath || !fs.existsSync(file)) return;

      let content = fs.readFileSync(file, 'utf-8');
      content = stripPrettierIgnore(content);
      content = expandCodeSrcToMarkdown(content, file);

      const outMd = path.join(outRoot, `${relPath}.md`);
      if (!fs.existsSync(outMd)) {
        fs.mkdirSync(path.dirname(outMd), { recursive: true });
        fs.writeFileSync(outMd, content, 'utf-8');
      }
    } catch {}
  });
}

/**
 * Raw Markdown 插件主函数
 * 负责在构建过程中处理 markdown 文档，生成 flattened markdown 文件到输出目录。
 * 主要功能包括：
 * 1. 收集所有 markdown 路由
 * 2. 在 HTML 文件导出阶段输出处理后的 raw markdown 文件
 *
 * @param api - Dumi API 实例
 */
export default async function rawMdPlugin(api: IApi) {
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
