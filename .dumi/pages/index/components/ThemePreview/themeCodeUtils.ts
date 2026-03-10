import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';

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
