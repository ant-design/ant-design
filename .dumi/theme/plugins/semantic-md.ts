import fs from 'fs';
import path from 'path';
import type { IApi } from 'dumi';

/**
 * 收集的组件路由列表
 */
let COMPONENT_ROUTES: Array<{ absPath: string; componentName: string; outputPath: string }> = [];

/**
 * 记录 semantic.md 文件是否已经输出过
 */
let SEMANTIC_MD_EMITTED = false;

/**
 * 从 _semantic*.tsx 文件中提取语义信息
 * @param semanticFile - _semantic*.tsx 文件的绝对路径
 * @returns 包含中文和英文语义描述的对象，失败返回 null
 */
function extractSemanticInfo(semanticFile: string): {
  cn: Record<string, string>;
  en: Record<string, string>;
} | null {
  try {
    if (!fs.existsSync(semanticFile)) return null;

    const content = fs.readFileSync(semanticFile, 'utf-8');

    const localesMatch = content.match(/(?:export\s+)?const\s+locales\s*=\s*\{([\s\S]*?)\};/);
    if (!localesMatch) return null;

    const cnMatch = content.match(/cn:\s*\{([\s\S]*?)\},?\s*en:/);
    if (!cnMatch) return null;

    const enMatch = content.match(/en:\s*\{([\s\S]*?)\}\s*[,;]/);
    if (!enMatch) return null;

    const cnContent = cnMatch[1];
    const enContent = enMatch[1];

    const cnSemantics: Record<string, string> = {};
    const enSemantics: Record<string, string> = {};

    const extractSemantics = (objContent: string, result: Record<string, string>) => {
      const semanticMatches = objContent.matchAll(
        /['"]?([^'":\s]+)['"]?\s*:\s*['"]([^'"]+)['"],?/g,
      );
      for (const match of semanticMatches) {
        const [, key, value] = match;
        if (key && value) {
          result[key] = value;
        }
      }
    };

    extractSemantics(cnContent, cnSemantics);
    extractSemantics(enContent, enSemantics);

    if (Object.keys(cnSemantics).length === 0) return null;

    return { cn: cnSemantics, en: enSemantics };
  } catch (error) {
    if (process.env.DEBUG) {
      console.error(`[semantic-md] Failed to extract semantic info from ${semanticFile}:`, error);
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
    parts.push(`- ${name}: ${desc}`);
  }
  return parts.join('\n');
}

/**
 * 为组件生成 semantic.md 文件
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

      // 检查是否存在 _semantic*.tsx 文件
      if (fs.existsSync(demoDir)) {
        const demoFiles = fs.readdirSync(demoDir);
        const semanticFiles = demoFiles.filter(
          (demoFile) => demoFile.startsWith('_semantic') && demoFile.endsWith('.tsx'),
        );

        // 为每个 _semantic*.tsx 文件生成对应的 semantic*.md 文件
        semanticFiles.forEach((semanticFile) => {
          const semanticFilePath = path.join(demoDir, semanticFile);
          const semanticInfo = extractSemanticInfo(semanticFilePath);

          if (!semanticInfo) {
            if (process.env.DEBUG) {
              console.warn(
                `[semantic-md] Failed to extract semantic info from ${semanticFilePath}, generating placeholder`,
              );
            }
          }

          // 从 _semantic.tsx 或 _semantic_group.tsx 提取后缀
          // _semantic.tsx -> semantic.md
          // _semantic_group.tsx -> semantic_group.md
          const semanticSuffix = semanticFile
            .replace(/^_semantic/, '') // 去掉 _semantic 前缀
            .replace(/\.tsx$/, ''); // 去掉 .tsx 后缀

          // 生成对应的 semantic*.md 文件名
          const semanticMdFileName = `semantic${semanticSuffix}.md`;
          const semanticMdPath = path.join(outRoot, outputPath, semanticMdFileName);
          const semanticMdDir = path.dirname(semanticMdPath);

          if (!fs.existsSync(semanticMdDir)) {
            fs.mkdirSync(semanticMdDir, { recursive: true });
          }

          const isZhCN = absPath.includes('-cn');
          let semantics: Record<string, string> = {};
          if (semanticInfo) {
            semantics = isZhCN ? semanticInfo.cn : semanticInfo.en;
          }

          // 生成组件显示名称（将 kebab-case 转换为 Title Case）
          const displayName = componentName
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          // 如果有后缀（如 _group），添加到标题中
          const titleSuffix = semanticSuffix
            ? semanticSuffix
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';

          // 生成 markdown 内容
          const parts = [
            `# ${displayName}${titleSuffix ? ` ${titleSuffix}` : ''}`,
            '',
            '## Semantic Parts',
            '',
          ];

          // 如果有语义信息，生成内容；
          if (Object.keys(semantics).length > 0) {
            parts.push(generateSemanticParts(semantics));
          }

          const content = `${parts.join('\n')}\n`;

          fs.writeFileSync(semanticMdPath, content, 'utf-8');
        });
      }
    } catch {}
  });
}

/**
 * 为组件生成 semantic.md 文件
 * @param api - Dumi API 实例
 */
export default async function semanticMdPlugin(api: IApi) {
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

  api.modifyExportHTMLFiles((files) => {
    emitSemanticMd(api);
    return files;
  });
}
