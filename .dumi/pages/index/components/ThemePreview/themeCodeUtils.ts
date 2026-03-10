import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';

/** 仅 theme 时（默认/暗黑）复制用的最小 import */
const MINIMAL_THEME_IMPORTS = `import React from 'react';
import { ConfigProvider, theme } from 'antd';`;

/** 从 hook 源码中解析 hook 名，并做仅去掉 UseTheme 依赖的清洗，保留 export default，作为单独的主题文件 */
function getThemeFileContent(source: string): { content: string; hookName: string } {
  const hookNameMatch = source.match(/export\s+default\s+(\w+)/);
  const hookName = hookNameMatch?.[1] ?? 'useTheme';
  const content = source
    .replace(/import type \{ UseTheme \} from '\.';\s*\n?/g, '')
    .replace(/const (use\w+Theme): UseTheme = /g, 'const $1 = ')
    .trim();
  return { content, hookName };
}

/** useGlassTheme -> glassTheme */
function hookNameToFileName(hookName: string): string {
  if (hookName.length <= 3) return hookName;
  return hookName.slice(3, 4).toLowerCase() + hookName.slice(4);
}

/** 生成「config」文件：引入主题 hook，用 configProps 包一层 ConfigProvider */
function getConfigFileContent(hookName: string, fileName: string): string {
  return `import React from 'react';
import { ConfigProvider } from 'antd';
import ${hookName} from './${fileName}';

export default () => {
  const configProps = ${hookName}();

  return <ConfigProvider {...configProps}>{/* Your App */}</ConfigProvider>;
};
`;
}

/**
 * 按两段导出：1) 主题文件（如 glassTheme.ts 内容） 2) config 使用文件。
 * 复制结果为两段用注释分隔的代码，可分别存成两个文件。
 */
export function generateFullCopyFile(params: {
  themeConfig?: ThemeConfig;
  copyCode?: string;
}): string {
  const { themeConfig, copyCode } = params;

  if (copyCode?.trim()) {
    const { content: themeFileContent, hookName } = getThemeFileContent(copyCode);
    const fileName = hookNameToFileName(hookName);
    const configContent = getConfigFileContent(hookName, fileName);
    return [
      `// ========== ${fileName}.ts ==========`,
      '',
      themeFileContent,
      '',
      '// ========== App.tsx ==========',
      '',
      configContent,
    ].join('\n');
  }

  const configPropsStr = !themeConfig
    ? '{ theme: { algorithm: theme.defaultAlgorithm } }'
    : (() => {
        const themeProps: string[] = [];
        const algorithmStr = getAlgorithmStr(themeConfig.algorithm);
        if (algorithmStr) themeProps.push(`algorithm: ${algorithmStr}`);
        if (themeConfig.token && Object.keys(themeConfig.token).length > 0) {
          themeProps.push(`token: ${stringifyValue(themeConfig.token, 1)}`);
        }
        if (themeConfig.components && Object.keys(themeConfig.components).length > 0) {
          themeProps.push(`components: ${stringifyValue(themeConfig.components, 1)}`);
        }
        if (themeProps.length === 0) {
          themeProps.push('algorithm: theme.defaultAlgorithm');
        }
        return `{ theme: { ${themeProps.join(', ')} } }`;
      })();

  return [
    '// ========== App.tsx ==========',
    '',
    MINIMAL_THEME_IMPORTS,
    '',
    'export default () => {',
    `  const configProps = ${configPropsStr};`,
    '  return (',
    '    <ConfigProvider {...configProps}>',
    '      {/* Your App */}',
    '    </ConfigProvider>',
    '  );',
    '};',
  ].join('\n');
}

function getAlgorithmStr(algorithm: ThemeConfig['algorithm']): string | null {
  if (!algorithm) return null;

  if (Array.isArray(algorithm)) {
    const algoStrs = algorithm.map(getAlgorithmStr).filter(Boolean) as string[];
    if (algoStrs.length === 0) return null;
    if (algoStrs.length === 1) return algoStrs[0];
    return `[${algoStrs.join(', ')}]`;
  }

  if (algorithm === antdTheme.defaultAlgorithm) return 'theme.defaultAlgorithm';
  if (algorithm === antdTheme.darkAlgorithm) return 'theme.darkAlgorithm';
  if (algorithm === antdTheme.compactAlgorithm) return 'theme.compactAlgorithm';

  return null;
}

function stringifyValue(value: unknown, depth = 0): string {
  const indent = '  '.repeat(depth + 1);
  const closingIndent = '  '.repeat(depth);

  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `'${value}'`;

  if (typeof value === 'function') {
    const algoStr = getAlgorithmStr(value as ThemeConfig['algorithm']);
    return algoStr ?? '/* function */';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => `${indent}${stringifyValue(item, depth + 1)}`);
    return `[\n${items.join(',\n')},\n${closingIndent}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined && typeof v !== 'function',
    );
    if (entries.length === 0) return '{}';
    const items = entries.map(([k, v]) => `${indent}${k}: ${stringifyValue(v, depth + 1)}`);
    return `{\n${items.join(',\n')},\n${closingIndent}}`;
  }

  return String(value);
}

export function generateThemeCode(themeConfig?: ThemeConfig): string {
  const importLines = ["import { ConfigProvider, theme } from 'antd';"];

  if (!themeConfig) {
    return [
      ...importLines,
      '',
      '<ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>',
      '  {/* Your App */}',
      '</ConfigProvider>',
    ].join('\n');
  }

  const { algorithm, token, components } = themeConfig;

  const themeProps: string[] = [];

  const algorithmStr = getAlgorithmStr(algorithm);
  if (algorithmStr) {
    themeProps.push(`    algorithm: ${algorithmStr},`);
  }

  if (token && Object.keys(token).length > 0) {
    const tokenStr = stringifyValue(token, 2);
    themeProps.push(`    token: ${tokenStr},`);
  }

  if (components && Object.keys(components).length > 0) {
    const componentsStr = stringifyValue(components, 2);
    themeProps.push(`    components: ${componentsStr},`);
  }

  return [
    ...importLines,
    '',
    '<ConfigProvider',
    '  theme={{',
    ...themeProps,
    '  }}',
    '>',
    '  {/* Your App */}',
    '</ConfigProvider>',
  ].join('\n');
}
