import fs from 'fs-extra';
import path from 'node:path';

import getDesignToken from '../components/theme/getDesignToken';

import { version } from '../package.json';

// ============================================================
// Types
// ============================================================

interface TokenMetaGlobal {
  [tokenName: string]: {
    name: string;
    nameEn: string;
    desc: string;
    descEn: string;
    type: string;
    source: string;
  };
}

interface TokenMetaComponentToken {
  source: string;
  token: string;
  type: string;
  desc: string;
  descEn: string;
  name: string;
  nameEn: string;
}

interface TokenMeta {
  global: TokenMetaGlobal;
  components: {
    [compName: string]: TokenMetaComponentToken[];
  };
}

interface TokenJsonComponent {
  global: string[];
  component: Record<string, string | number>;
}

interface TokenJson {
  [compName: string]: TokenJsonComponent;
}

// ============================================================
// Color token group definitions
// ============================================================

const COLOR_GROUPS: { group: string; tokens: string[] }[] = [
  {
    group: 'Brand',
    tokens: [
      'colorPrimary',
      'colorPrimaryHover',
      'colorPrimaryActive',
      'colorPrimaryBg',
      'colorPrimaryBgHover',
      'colorPrimaryBorder',
      'colorPrimaryBorderHover',
      'colorPrimaryText',
      'colorPrimaryTextHover',
      'colorPrimaryTextActive',
    ],
  },
  {
    group: 'Functional',
    tokens: [
      'colorError',
      'colorErrorHover',
      'colorErrorActive',
      'colorErrorBg',
      'colorErrorBorder',
      'colorErrorText',
      'colorWarning',
      'colorWarningHover',
      'colorWarningActive',
      'colorWarningBg',
      'colorWarningBorder',
      'colorWarningText',
      'colorSuccess',
      'colorSuccessHover',
      'colorSuccessActive',
      'colorSuccessBg',
      'colorSuccessBorder',
      'colorSuccessText',
      'colorInfo',
      'colorInfoHover',
      'colorInfoActive',
      'colorInfoBg',
      'colorInfoBorder',
      'colorInfoText',
    ],
  },
  {
    group: 'Text',
    tokens: [
      'colorText',
      'colorTextSecondary',
      'colorTextTertiary',
      'colorTextQuaternary',
      'colorTextLightSolid',
      'colorTextHeading',
      'colorTextLabel',
      'colorTextDescription',
      'colorTextDisabled',
      'colorTextPlaceholder',
    ],
  },
  {
    group: 'Background',
    tokens: [
      'colorBgContainer',
      'colorBgElevated',
      'colorBgLayout',
      'colorBgSpotlight',
      'colorBgMask',
    ],
  },
  {
    group: 'Border',
    tokens: ['colorBorder', 'colorBorderSecondary', 'colorBorderDisabled'],
  },
  {
    group: 'Fill',
    tokens: [
      'colorFill',
      'colorFillSecondary',
      'colorFillTertiary',
      'colorFillQuaternary',
      'colorFillContent',
      'colorFillContentHover',
      'colorFillAlter',
    ],
  },
  {
    group: 'Link',
    tokens: ['colorLink', 'colorLinkHover', 'colorLinkActive'],
  },
  {
    group: 'Highlight',
    tokens: ['colorHighlight'],
  },
  {
    group: 'Icon',
    tokens: ['colorIcon', 'colorIconHover'],
  },
  {
    group: 'Control',
    tokens: ['controlItemBgHover', 'controlItemBgActive', 'controlItemBgActiveHover'],
  },
];

const TYPOGRAPHY_LEVELS: {
  key: string;
  fontSizeToken: string;
  lineHeightToken: string;
  fontWeight: number;
}[] = [
  {
    key: 'heading-1',
    fontSizeToken: 'fontSizeHeading1',
    lineHeightToken: 'lineHeightHeading1',
    fontWeight: 700,
  },
  {
    key: 'heading-2',
    fontSizeToken: 'fontSizeHeading2',
    lineHeightToken: 'lineHeightHeading2',
    fontWeight: 600,
  },
  {
    key: 'heading-3',
    fontSizeToken: 'fontSizeHeading3',
    lineHeightToken: 'lineHeightHeading3',
    fontWeight: 600,
  },
  {
    key: 'heading-4',
    fontSizeToken: 'fontSizeHeading4',
    lineHeightToken: 'lineHeightHeading4',
    fontWeight: 600,
  },
  {
    key: 'heading-5',
    fontSizeToken: 'fontSizeHeading5',
    lineHeightToken: 'lineHeightHeading5',
    fontWeight: 600,
  },
  { key: 'body-lg', fontSizeToken: 'fontSizeLG', lineHeightToken: 'lineHeightLG', fontWeight: 400 },
  { key: 'body-md', fontSizeToken: 'fontSize', lineHeightToken: 'lineHeight', fontWeight: 400 },
  { key: 'body-sm', fontSizeToken: 'fontSizeSM', lineHeightToken: 'lineHeightSM', fontWeight: 400 },
  {
    key: 'label-lg',
    fontSizeToken: 'fontSizeLG',
    lineHeightToken: 'lineHeightLG',
    fontWeight: 600,
  },
  { key: 'label-md', fontSizeToken: 'fontSize', lineHeightToken: 'lineHeight', fontWeight: 600 },
  {
    key: 'label-sm',
    fontSizeToken: 'fontSizeSM',
    lineHeightToken: 'lineHeightSM',
    fontWeight: 600,
  },
];

const CORE_COMPONENTS = [
  'Alert',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Card',
  'Checkbox',
  'Collapse',
  'DatePicker',
  'Drawer',
  'Dropdown',
  'Form',
  'Input',
  'Menu',
  'Modal',
  'Notification',
  'Pagination',
  'Popover',
  'Progress',
  'Radio',
  'Select',
  'Slider',
  'Steps',
  'Switch',
  'Table',
  'Tabs',
  'Tag',
  'Tooltip',
  'Typography',
];

const MOTION_TOKENS: { key: string; token: string }[] = [
  { key: 'duration-fast', token: 'motionDurationFast' },
  { key: 'duration-mid', token: 'motionDurationMid' },
  { key: 'duration-slow', token: 'motionDurationSlow' },
  { key: 'ease-in-out', token: 'motionEaseInOut' },
  { key: 'ease-out', token: 'motionEaseOut' },
  { key: 'ease-in-back', token: 'motionEaseInBack' },
  { key: 'ease-out-back', token: 'motionEaseOutBack' },
  { key: 'ease-out-circ', token: 'motionEaseOutCirc' },
  { key: 'ease-in-out-circ', token: 'motionEaseInOutCirc' },
  { key: 'ease-out-quint', token: 'motionEaseOutQuint' },
  { key: 'ease-in-quint', token: 'motionEaseInQuint' },
];

const SHADOW_TOKENS: { key: string; token: string }[] = [
  { key: 'default', token: 'boxShadow' },
  { key: 'secondary', token: 'boxShadowSecondary' },
  { key: 'tertiary', token: 'boxShadowTertiary' },
  { key: 'card', token: 'boxShadowCard' },
];

// ============================================================
// Utility functions
// ============================================================

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function colorTokenToYamlKey(tokenName: string): string {
  // Strip 'color' prefix then convert remaining camelCase to kebab-case
  return camelToKebab(tokenName.replace(/^color/, ''));
}

function formatTokenValue(
  value: string | number | boolean | undefined,
  options?: {
    isLineHeight?: boolean;
    isFontWeight?: boolean;
    isScale?: boolean;
    isBoolean?: boolean;
  },
): string {
  if (value === undefined || value === null) {
    return '""';
  }
  // Boolean values
  if (typeof value === 'boolean' || options?.isBoolean) {
    return String(value);
  }
  if (typeof value === 'string') {
    // Duration tokens like "0.1s"
    if (/^\d+(\.\d+)?s$/.test(value)) {
      return `"${value}"`;
    }
    // cubic-bezier or calc expressions
    if (value.startsWith('cubic-bezier') || value.startsWith('calc')) {
      return `"${value}"`;
    }
    // rgba values
    if (value.startsWith('rgba')) {
      return `"${value}"`;
    }
    // Hex colors (may or may not have #)
    if (/^[0-9a-f]{3,8}$/i.test(value)) {
      return `"#${value}"`;
    }
    if (/^#[0-9a-f]{3,8}$/i.test(value)) {
      return `"${value}"`;
    }
    // Keywords like "transparent", "solid", "auto", "inherit", "none", etc.
    if (/^[a-z]/i.test(value) && !value.startsWith('path') && !value.startsWith('polygon')) {
      return `"${value}"`;
    }
    // Already has px or other units
    if (/^\d+(\.\d+)?px$/.test(value)) {
      return `"${value}"`;
    }
    // CSS expressions with spaces (e.g. "0 2px 0 rgba(...)")
    if (/^\d/.test(value) && /[a-z(]/i.test(value)) {
      return `"${value}"`;
    }
    // Plain number strings
    if (/^\d+(\.\d+)?$/.test(value)) {
      return `"${value}px"`;
    }
    // Fallback: quote as-is
    return `"${value}"`;
  }
  // Number
  if (typeof value === 'number') {
    if (options?.isLineHeight) {
      // Unitless line height (decimal multiplier like 1.5)
      return String(value);
    }
    if (options?.isFontWeight) {
      // Font weight is unitless
      return String(value);
    }
    if (options?.isScale) {
      // Scale factors like expandIconScale = 0.941...
      return String(value);
    }
    // Numeric sizes get px
    return `"${value}px"`;
  }
  return `"${String(value)}"`;
}

function isColorValue(value: string | number): boolean {
  if (typeof value === 'string') {
    return /^#/.test(value) || /^rgba?\(/.test(value);
  }
  return false;
}

function quoteYaml(value: string): string {
  if (value.includes('\n')) {
    // Multiline: use YAML literal block
    const lines = value.split('\n');
    return `|\n${lines.map((line) => `      ${line}`).join('\n')}`;
  }
  // Check if quoting is needed
  if (
    value === '' ||
    /[:#{}>'"|&!?]/.test(value) ||
    value.includes('[') ||
    value.includes(']') ||
    /^\s/.test(value) ||
    /\s$/.test(value) ||
    /^[-+]/.test(value) ||
    /^(true|false|null|yes|no|on|off|~)$/i.test(value) ||
    /^\d+(\.\d+)?$/.test(value)
  ) {
    // Use double-quoted style, escape internal quotes and backslashes
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  return value;
}

function getMajorVersion(ver: string): string {
  const match = ver.match(/^(\d+)\./);
  return match ? `${match[1]}.x` : ver;
}

function normalizeShadow(value: string): string {
  return value.replace(/\n\s*/g, ' ').trim();
}

// ============================================================
// Token value resolution for component tokens
// ============================================================

// Build a reverse map from global token value -> global token name
// for resolving component token values to global references
function buildGlobalTokenValueMap(aliasToken: Record<string, any>): Map<string, string> {
  const valueMap = new Map<string, string>();
  for (const [key, val] of Object.entries(aliasToken)) {
    if (val !== undefined && val !== null) {
      const strVal = String(val);
      valueMap.set(strVal, key);
    }
  }
  return valueMap;
}

// Build color token yaml key lookup for reference resolution
function buildColorKeyMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const group of COLOR_GROUPS) {
    for (const token of group.tokens) {
      const yamlKey = colorTokenToYamlKey(token);
      map.set(token, `{colors.${yamlKey}}`);
    }
  }
  return map;
}

// Build shadow key lookup
function buildShadowKeyMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const s of SHADOW_TOKENS) {
    map.set(s.token, `{shadows.${s.key}}`);
  }
  return map;
}

// Build rounded key lookup
function buildRoundedKeyMap(aliasToken: Record<string, any>): Map<string, string> {
  const map = new Map<string, string>();
  const roundedPairs: [string, string][] = [
    ['none', '0'],
    ['xs', String(aliasToken.borderRadiusXS)],
    ['sm', String(aliasToken.borderRadiusSM)],
    ['DEFAULT', String(aliasToken.borderRadius)],
    ['lg', String(aliasToken.borderRadiusLG)],
  ];
  for (const [key, val] of roundedPairs) {
    map.set(val, `{rounded.${key}}`);
  }
  return map;
}

// Build typography key lookup
function buildTypographyKeyMap(aliasToken: Record<string, any>): Map<string, string> {
  const map = new Map<string, string>();
  for (const level of TYPOGRAPHY_LEVELS) {
    const fs = String(aliasToken[level.fontSizeToken as keyof typeof aliasToken]);
    const lh = String(aliasToken[level.lineHeightToken as keyof typeof aliasToken]);
    // Map both fontSize+lineHeight combo and individual fontSize
    map.set(`${fs}+${lh}`, `{typography.${level.key}}`);
    map.set(fs, `{typography.${level.key}}`);
  }
  return map;
}

// Try to map a component token name + value to a global token reference
function resolveComponentTokenValue(
  tokenName: string,
  rawValue: string | number,
  colorKeyMap: Map<string, string>,
  shadowKeyMap: Map<string, string>,
  roundedKeyMap: Map<string, string>,
  typographyKeyMap: Map<string, string>,
  globalValueMap: Map<string, string>,
  aliasToken: Record<string, any>,
): string | null {
  const strVal = String(rawValue);

  // Check if this token name is a known global token
  if (colorKeyMap.has(tokenName)) {
    return colorKeyMap.get(tokenName)!;
  }
  if (shadowKeyMap.has(tokenName)) {
    return shadowKeyMap.get(tokenName)!;
  }
  if (roundedKeyMap.has(tokenName)) {
    return roundedKeyMap.get(tokenName)!;
  }
  if (typographyKeyMap.has(tokenName)) {
    return typographyKeyMap.get(tokenName)!;
  }

  // Try to match value to known global tokens by value
  const matchedGlobalToken = globalValueMap.get(strVal);
  if (matchedGlobalToken) {
    // Check if the matched global token is a color
    if (colorKeyMap.has(matchedGlobalToken)) {
      return colorKeyMap.get(matchedGlobalToken)!;
    }
    // Check if it's a shadow
    if (shadowKeyMap.has(matchedGlobalToken)) {
      return shadowKeyMap.get(matchedGlobalToken)!;
    }
    // Check if it's a rounded value
    if (roundedKeyMap.has(strVal)) {
      return roundedKeyMap.get(strVal)!;
    }
    // Check typography
    if (typographyKeyMap.has(strVal)) {
      return typographyKeyMap.get(strVal)!;
    }
  }

  // Check value directly against color, shadow, rounded maps
  if (colorKeyMap.has(tokenName)) {
    return colorKeyMap.get(tokenName)!;
  }
  if (isColorValue(strVal)) {
    // Try matching by value against the aliasToken color values
    for (const group of COLOR_GROUPS) {
      for (const colorToken of group.tokens) {
        const colorVal = String(aliasToken[colorToken as keyof typeof aliasToken] ?? '');
        if (strVal === colorVal) {
          return `{colors.${colorTokenToYamlKey(colorToken)}}`;
        }
      }
    }
  }

  // Check shadow values (normalize raw value for comparison)
  if (typeof rawValue === 'string' && rawValue.includes('rgba') && rawValue.includes('px')) {
    const normalizedVal = normalizeShadow(rawValue);
    for (const s of SHADOW_TOKENS) {
      const shadowVal = String(aliasToken[s.token as keyof typeof aliasToken] ?? '');
      if (shadowVal && normalizeShadow(shadowVal) === normalizedVal) {
        return `{shadows.${s.key}}`;
      }
    }
  }

  // Check rounded values
  if (roundedKeyMap.has(strVal)) {
    return roundedKeyMap.get(strVal)!;
  }

  // Check typography values (fontSize matching)
  if (typographyKeyMap.has(strVal)) {
    return typographyKeyMap.get(strVal)!;
  }

  return null;
}

// ============================================================
// Filter component tokens
// ============================================================

function shouldFilterComponentToken(tokenName: string, value: string | number): boolean {
  // Filter out arrowPath / arrowPolygon
  if (tokenName === 'arrowPath' || tokenName === 'arrowPolygon') {
    return true;
  }
  // Filter out zIndexPopup
  if (tokenName === 'zIndexPopup') {
    return true;
  }
  // Filter out INTERNAL_* prefix
  if (tokenName.startsWith('INTERNAL_')) {
    return true;
  }
  // Filter out dark* prefix
  if (tokenName.startsWith('dark')) {
    return true;
  }
  // Filter out CSS path()/polygon() function values
  const strVal = String(value);
  if (strVal.startsWith('path(') || strVal.startsWith('polygon(')) {
    return true;
  }
  return false;
}

function shouldIncludeComponentToken(tokenName: string, value: string | number): boolean {
  return !shouldFilterComponentToken(tokenName, value);
}

// ============================================================
// Markdown table helpers
// ============================================================

function mdTableHeader(cols: string[]): string {
  return `| ${cols.join(' | ')} |`;
}

function mdTableDivider(count: number): string {
  return `| ${Array.from({ length: count }, () => '---').join(' | ')} |`;
}

function mdTableRow(cells: string[]): string {
  return `| ${cells.join(' | ')} |`;
}

function escapeMdTablePipe(str: string): string {
  return str.replace(/\|/g, '\\|');
}

// ============================================================
// YAML serialization helpers
// ============================================================

function yamlIndent(level: number): string {
  return '  '.repeat(level);
}

function yamlScalar(value: string | number, _indent: number): string {
  const str = String(value);
  return quoteYaml(str);
}

function yamlKeyValue(key: string, value: string | number, indent: number): string {
  return `${yamlIndent(indent)}${key}: ${yamlScalar(String(value), indent)}`;
}

function yamlLiteralKeyValue(key: string, value: string, indent: number): string {
  const lines = value.split('\n').filter((l) => l.trim() !== '');
  if (lines.length <= 1) {
    return yamlKeyValue(key, value, indent);
  }
  const result = [`${yamlIndent(indent)}${key}: |`];
  for (const line of lines) {
    result.push(`${yamlIndent(indent + 1)}${line.trim()}`);
  }
  return result.join('\n');
}

// ============================================================
// Component token prose table builder
// ============================================================

function buildComponentTokenTable(
  compName: string,
  aliasToken: Record<string, any>,
  tokenMeta: TokenMeta,
  tokenJson: TokenJson,
  compTokenTypeMap: Map<string, string>,
  lang: 'en' | 'zh',
): string {
  const compTokenJson = tokenJson[compName];
  if (!compTokenJson) return '';

  const componentTokens = compTokenJson.component || {};
  const tokenEntries = Object.entries(componentTokens);
  const filteredEntries = tokenEntries.filter(([name, value]) =>
    shouldIncludeComponentToken(name, value),
  );

  if (filteredEntries.length === 0) return '';

  const compMeta = tokenMeta.components[compName] || [];
  const metaByName = new Map<string, TokenMetaComponentToken>();
  for (const t of compMeta) {
    metaByName.set(t.token, t);
  }

  const headerCols =
    lang === 'en'
      ? ['Token', 'CSS Variable', 'Default', 'Description']
      : ['Token', 'CSS 变量', '默认值', '描述'];

  const lines: string[] = [];
  lines.push(mdTableHeader(headerCols));
  lines.push(mdTableDivider(headerCols.length));

  for (const [tokenName, rawValue] of filteredEntries) {
    const cssVar = `--ant-${camelToKebab(compName)}-${camelToKebab(tokenName)}`;
    const meta = metaByName.get(tokenName);
    const metaType = compTokenTypeMap.get(`${compName}.${tokenName}`) ?? '';

    const isFontWeight = metaType.includes('FontWeight') || /fontWeight$/i.test(tokenName);
    const isLineHeightNamePattern = /LineHeight/i.test(tokenName);
    const isUnitlessLineHeight =
      (metaType.includes('LineHeight') || isLineHeightNamePattern) &&
      typeof rawValue === 'number' &&
      rawValue < 10;
    const isBoolean = typeof rawValue === 'boolean' || metaType === 'boolean';
    const isScale = /Scale$/i.test(tokenName);

    const formatted = formatTokenValue(rawValue, {
      isLineHeight: isUnitlessLineHeight,
      isFontWeight,
      isScale,
      isBoolean,
    });

    const desc = lang === 'en' ? meta?.descEn || '' : meta?.desc || '';

    lines.push(
      mdTableRow([
        `\`${tokenName}\``,
        `\`${cssVar}\``,
        escapeMdTablePipe(formatted),
        escapeMdTablePipe(desc),
      ]),
    );
  }

  return lines.join('\n');
}

// ============================================================
// English prose generation
// ============================================================

function generateEnglishProse(
  antdVersion: string,
  aliasToken: Record<string, any>,
  tokenMeta: TokenMeta,
  tokenJson: TokenJson,
  compTokenTypeMap: Map<string, string>,
): string {
  const sections: string[] = [];
  const fontFamily = String(aliasToken.fontFamily).replace(/\n/g, ' ').trim();

  // --- Section 1: Overview ---
  sections.push(`## Overview`);

  sections.push(
    `Ant Design is an enterprise-class UI design language and React component library built on four design values: **Natural**, **Deterministic**, **Meaningful**, and **Growing**. These values guide every decision from token naming to interaction patterns, ensuring that the system feels intuitive, predictable, purposeful, and scalable.`,
  );
  sections.push(
    `Theme customization is managed through \`ConfigProvider\`, which wraps your application and propagates design tokens down the component tree. The token system operates in four layers:`,
  );
  sections.push(
    `- **Seed tokens** (e.g., \`colorPrimary\`, \`fontSize\`) are the entry point for customization.`,
  );
  sections.push(
    `- **Map tokens** transform seed values into intermediate scales (e.g., \`${String(aliasToken.colorPrimary)}\` becomes a full palette of hover, active, and background variants).`,
  );
  sections.push(
    `- **Alias tokens** provide semantic names that map tokens to their role (e.g., \`colorText\`, \`colorBgContainer\`).`,
  );
  sections.push(
    `- **Component tokens** override alias and map tokens at the per-component level for fine-grained control.`,
  );
  sections.push(
    `Three algorithm presets are available: \`default\` (light theme), \`dark\` (dark theme), and \`compact\` (dense layout). You can also compose custom algorithms by combining presets. CSS Variables mode (\`cssVar: true\`) is supported for runtime theming and SSR hydration.`,
  );
  sections.push(``);
  sections.push(`**Key Characteristics:**`);
  sections.push(`- Seed-driven: change one color, auto-derive a full 10-shade palette`);
  sections.push(`- Semantic token names that describe purpose, not appearance`);
  sections.push(`- Per-component token overrides for precise customization`);
  sections.push(`- Built-in dark mode algorithm with automatic color inversion`);
  sections.push(`- Compact algorithm for space-efficient layouts`);
  sections.push(`- CSS Variables support for runtime theme switching`);
  sections.push(`- RTL-aware layout tokens`);
  sections.push(``);

  // --- Section 2: Colors ---
  sections.push(`## Colors`);

  const colorTableCols = ['Token', 'CSS Variable', 'Default', 'Category'];
  sections.push(mdTableHeader(colorTableCols));
  sections.push(mdTableDivider(colorTableCols.length));
  for (const group of COLOR_GROUPS) {
    for (const token of group.tokens) {
      const val = aliasToken[token];
      if (val !== undefined) {
        const cssVar = `--ant-${camelToKebab(token)}`;
        const formatted =
          isColorValue(val) || typeof val === 'string' ? `\`${String(val)}\`` : `\`${val}\``;
        sections.push(mdTableRow([`\`${token}\``, `\`${cssVar}\``, formatted, group.group]));
      }
    }
  }
  sections.push(``);
  sections.push(
    `The color system derives all palettes from a single seed color (\`colorPrimary\`). The default algorithm generates 10 shades per hue using HSL-based lightness shifts, ensuring consistent contrast ratios across hover, active, and background states. To customize, set \`colorPrimary\` in your \`ConfigProvider\` theme token and the entire palette recalculates automatically.`,
  );
  sections.push(
    `Functional colors (\`colorError\`, \`colorWarning\`, \`colorSuccess\`, \`colorInfo\`) follow the same derivation algorithm and can be overridden independently.`,
  );
  sections.push(``);

  // --- Section 3: Typography ---
  sections.push(`## Typography`);

  const typoCols = ['Level', 'Font', 'Size', 'Weight', 'Line Height'];
  sections.push(mdTableHeader(typoCols));
  sections.push(mdTableDivider(typoCols.length));
  for (const level of TYPOGRAPHY_LEVELS) {
    const fontSize = aliasToken[level.fontSizeToken];
    const lineHeight = aliasToken[level.lineHeightToken];
    sections.push(
      mdTableRow([
        `\`${level.key}\``,
        `{fonts.sans}`,
        `\`${fontSize}px\``,
        String(level.fontWeight),
        String(lineHeight),
      ]),
    );
  }
  sections.push(``);
  sections.push(
    `The default font stack prioritizes system fonts for optimal rendering on each platform: ${fontFamily}. For code blocks and inline code, a monospace stack is used: \`${String(aliasToken.fontFamilyCode).replace(/\n/g, ' ').trim()}\`.`,
  );
  sections.push(``);

  // --- Section 4: Layout & Spacing ---
  sections.push(`## Layout & Spacing`);

  const spacingCols = ['Token', 'CSS Variable', 'Value'];
  sections.push(mdTableHeader(spacingCols));
  sections.push(mdTableDivider(spacingCols.length));
  const spacingTokens: [string, string][] = [
    ['xxs', 'paddingXXS'],
    ['xs', 'paddingXS'],
    ['sm', 'paddingSM'],
    ['md', 'padding'],
    ['lg', 'paddingLG'],
    ['xl', 'paddingXL'],
    ['xxl', 'marginXXL'],
  ];
  for (const [, token] of spacingTokens) {
    const val = aliasToken[token];
    const cssVar = `--ant-${camelToKebab(token)}`;
    sections.push(mdTableRow([`\`${token}\``, `\`${cssVar}\``, `\`${val}px\``]));
  }
  sections.push(``);

  sections.push(`### Responsive Breakpoints`);
  const bpCols = ['Breakpoint', 'Width'];
  sections.push(mdTableHeader(bpCols));
  sections.push(mdTableDivider(bpCols.length));
  const breakpoints: [string, number][] = [
    ['xs', 480],
    ['sm', 576],
    ['md', 768],
    ['lg', 992],
    ['xl', 1200],
    ['xxl', 1600],
  ];
  for (const [name, width] of breakpoints) {
    sections.push(mdTableRow([name, `>= ${width}px`]));
  }
  sections.push(``);

  sections.push(`### Background Layers`);
  sections.push(`Ant Design uses a three-layer background system to convey visual hierarchy:`);
  sections.push(
    `- **\`colorBgLayout\`** (\`${aliasToken.colorBgLayout}\`) \u2014 The outermost canvas behind all containers.`,
  );
  sections.push(
    `- **\`colorBgContainer\`** (\`${aliasToken.colorBgContainer}\`) \u2014 The default container surface for cards, panels, and inputs.`,
  );
  sections.push(
    `- **\`colorBgElevated\`** (\`${aliasToken.colorBgElevated}\`) \u2014 Elevated surfaces such as dropdowns, tooltips, and popovers that appear above the container layer.`,
  );
  sections.push(``);

  // --- Section 5: Elevation & Depth ---
  sections.push(`## Elevation & Depth`);

  const shadowCols = ['Level', 'Token', 'CSS Variable', 'Default'];
  sections.push(mdTableHeader(shadowCols));
  sections.push(mdTableDivider(shadowCols.length));
  for (const s of SHADOW_TOKENS) {
    const rawVal = String(aliasToken[s.token] ?? '');
    const normalized = normalizeShadow(rawVal);
    const cssVar = `--ant-${camelToKebab(s.token)}`;
    sections.push(
      mdTableRow([
        s.key,
        `\`${s.token}\``,
        `\`${cssVar}\``,
        escapeMdTablePipe(`\`${normalized}\``),
      ]),
    );
  }
  sections.push(``);

  sections.push(`### Shadow Philosophy`);
  sections.push(
    `Shadows communicate elevation. The default shadow (\`boxShadow\`) is used for popovers and floating elements. \`boxShadowSecondary\` adds depth for modals and drawers. \`boxShadowTertiary\` provides the subtlest lift for inline raised elements. \`boxShadowCard\` is tuned for card surfaces. Keep shadows minimal\u2014excessive depth creates visual noise.`,
  );
  sections.push(``);

  sections.push(`### Motion`);
  const motionCols = ['Token', 'CSS Variable', 'Default'];
  sections.push(mdTableHeader(motionCols));
  sections.push(mdTableDivider(motionCols.length));
  for (const m of MOTION_TOKENS) {
    const val = aliasToken[m.token];
    const cssVar = `--ant-${camelToKebab(m.token)}`;
    if (val !== undefined) {
      sections.push(mdTableRow([`\`${m.token}\``, `\`${cssVar}\``, `\`${String(val)}\``]));
    }
  }
  sections.push(``);

  sections.push(
    `- **Fast** (\`${aliasToken.motionDurationFast}\`): Micro-interactions\u2014hover highlights, toggle switches, focus rings.`,
  );
  sections.push(
    `- **Mid** (\`${aliasToken.motionDurationMid}\`): Standard transitions\u2014collapses, tab switches, dropdown appearance.`,
  );
  sections.push(
    `- **Slow** (\`${aliasToken.motionDurationSlow}\`): Significant layout changes\u2014modal entrance, drawer slide, page transitions.`,
  );
  sections.push(``);
  sections.push(
    `Use **ease-out** curves for elements entering the viewport and **ease-in-out** for continuous or reversible animations. The \`ease-in-back\`/\`ease-out-back\` pair creates a subtle overshoot effect suited to expand/collapse patterns.`,
  );
  sections.push(``);
  sections.push(`### Common Transition Patterns`);
  sections.push(
    `- **Expand/Collapse**: \`motionDurationMid\` + \`motionEaseOutQuad\` or \`motionEaseOutBack\``,
  );
  sections.push(`- **Fade**: \`motionDurationFast\` + \`motionEaseOut\``);
  sections.push(`- **Slide**: \`motionDurationMid\` + \`motionEaseOutCirc\``);
  sections.push(`- **Overlay Mask**: \`motionDurationSlow\` + \`motionEaseOutQuint\``);
  sections.push(``);

  // --- Section 6: Shapes ---
  sections.push(`## Shapes`);

  const shapeCols = ['Scale', 'Token', 'Value'];
  sections.push(mdTableHeader(shapeCols));
  sections.push(mdTableDivider(shapeCols.length));
  const shapeEntries: [string, string, string][] = [
    ['none', '-', '0'],
    ['xs', 'borderRadiusXS', `${aliasToken.borderRadiusXS}px`],
    ['sm', 'borderRadiusSM', `${aliasToken.borderRadiusSM}px`],
    ['DEFAULT', 'borderRadius', `${aliasToken.borderRadius}px`],
    ['lg', 'borderRadiusLG', `${aliasToken.borderRadiusLG}px`],
  ];
  for (const [scale, token, value] of shapeEntries) {
    sections.push(mdTableRow([scale, token ? `\`${token}\`` : '-', `\`${value}\``]));
  }
  sections.push(``);

  sections.push(`### Per-Component Shape Guidance`);
  sections.push(
    `- **Buttons, Inputs, Select**: Use \`borderRadius\` (default) for consistent form element appearance.`,
  );
  sections.push(`- **Cards, Modals**: Use \`borderRadiusLG\` for larger container elements.`);
  sections.push(
    `- **Tags, Badges, Avatars**: Use \`borderRadiusSM\` for small inline elements, or \`borderRadiusXS\` for subtle rounding.`,
  );
  sections.push(
    `- **Tooltips, Popovers**: Use \`borderRadiusLG\` for floating panels to distinguish them from inline elements.`,
  );
  sections.push(``);

  // --- Section 7: Components ---
  sections.push(`## Components`);

  sections.push(
    `> All components support \`classNames\` and \`styles\` props for sub-element level customization.`,
  );
  sections.push(``);

  for (const compName of CORE_COMPONENTS) {
    sections.push(`### ${compName}`);
    const table = buildComponentTokenTable(
      compName,
      aliasToken,
      tokenMeta,
      tokenJson,
      compTokenTypeMap,
      'en',
    );
    if (table) {
      sections.push(table);
    } else {
      sections.push(`_No component tokens available._`);
    }
    sections.push(``);
  }

  // --- Section 8: Do's and Don'ts ---
  sections.push(`## Do's and Don'ts`);

  const dosDonts: [string, string][] = [
    [
      'Do',
      'Let the algorithm auto-derive palettes from `colorPrimary`. Override only when you need a specific brand color that the algorithm cannot produce.',
    ],
    [
      "Don't",
      'Hardcode hex values for hover, active, or background states. Always use the derived semantic tokens so dark mode works correctly.',
    ],
    [
      'Do',
      'Use semantic tokens (`colorText`, `colorBgContainer`) instead of raw color values. Semantic tokens adapt to algorithm changes.',
    ],
    [
      "Don't",
      'Create multiple `ConfigProvider` instances with different themes for the same visual area. Prefer a single provider at the app root.',
    ],
    [
      'Do',
      'Manage theme centrally with a single `ConfigProvider` at the app root. Use nested providers only for intentional theme zones.',
    ],
    [
      "Don't",
      'Reference internal or private token names that start with `INTERNAL_`. These are implementation details and may change between versions.',
    ],
    [
      'Do',
      'Use the rounded scale (`borderRadiusXS` through `borderRadiusLG`) instead of arbitrary pixel values for consistency.',
    ],
    [
      "Don't",
      'Use animation durations longer than `motionDurationSlow` (0.3s). Extended durations degrade perceived responsiveness.',
    ],
    [
      'Do',
      'Keep shadows subtle. Prefer `boxShadowTertiary` for slight elevation and reserve `boxShadow` for popovers and overlays.',
    ],
    [
      "Don't",
      'Skip contrast testing when customizing colors. Override `colorText`, `colorBgContainer`, and functional colors together, then verify WCAG 2.1 AA compliance.',
    ],
  ];

  for (const [label, text] of dosDonts) {
    const icon = label === 'Do' ? '\u2705' : '\u274C';
    sections.push(`- ${icon} **${label}**: ${text}`);
  }
  sections.push(``);

  // --- Section 9: Agent Prompt Guide ---
  sections.push(`## Agent Prompt Guide`);

  sections.push(`### Quick Color Reference`);
  const quickColorCols = ['Name', 'Token', 'Default'];
  sections.push(mdTableHeader(quickColorCols));
  sections.push(mdTableDivider(quickColorCols.length));
  const quickColors: [string, string][] = [
    ['Primary', 'colorPrimary'],
    ['Error', 'colorError'],
    ['Warning', 'colorWarning'],
    ['Success', 'colorSuccess'],
    ['Info', 'colorInfo'],
    ['Text', 'colorText'],
    ['Text Secondary', 'colorTextSecondary'],
    ['Background Container', 'colorBgContainer'],
    ['Background Layout', 'colorBgLayout'],
    ['Border', 'colorBorder'],
  ];
  for (const [name, token] of quickColors) {
    const val = aliasToken[token];
    sections.push(mdTableRow([name, `\`${token}\``, `\`${String(val)}\``]));
  }
  sections.push(``);

  sections.push(`### Example Component Prompts`);
  sections.push(
    `1. \`Create a primary Button with custom color #722ed1, using ConfigProvider to set colorPrimary and override Button.componentToken for padding control.\``,
  );
  sections.push(
    `2. \`Build a data Table with alternating row colors using token colorFillAlter and customize header style via Table.componentToken.headerBg.\``,
  );
  sections.push(
    `3. \`Design a dark-mode Dashboard using algorithm: theme.darkAlgorithm, override colorBgLayout to #141414, and adjust Card tokens for elevated surfaces.\``,
  );
  sections.push(
    `4. \`Implement a compact form layout with algorithm: theme.compactAlgorithm, then fine-tune Input.componentToken.paddingBlockSM for tighter spacing.\``,
  );
  sections.push(
    `5. \`Create a notification system using Notification.componentToken to customize width, add custom padding, and match the brand colorPrimary.\``,
  );
  sections.push(``);

  sections.push(`### Non-Negotiable Iteration Rules`);
  const rules: string[] = [
    'Never bypass ConfigProvider for theming\u2014always propagate tokens through the provider tree.',
    'Always derive hover/active/background variants from the seed color algorithm rather than hardcoding individual shades.',
    'Maintain the 3-layer background hierarchy (layout \u2192 container \u2192 elevated) when adding new surfaces.',
    'Use motion tokens for all animations\u2014never hardcode durations or easing values inline.',
    'Respect the rounded scale; do not introduce arbitrary border-radius values outside the 5-step system.',
    'Test all custom themes in both light and dark algorithms before shipping.',
    'Keep component token overrides minimal\u2014prefer global token changes for broad consistency.',
    'Ensure WCAG 2.1 AA contrast (4.5:1 for normal text) whenever customizing text or background colors.',
    'When adding new components, follow the token naming convention: component-scoped tokens prefixed with the component name in camelCase.',
  ];
  for (let i = 0; i < rules.length; i++) {
    sections.push(`${i + 1}. ${rules[i]}`);
  }
  sections.push(``);

  return sections.join('\n');
}

// ============================================================
// Chinese prose generation
// ============================================================

function generateChineseProse(
  antdVersion: string,
  aliasToken: Record<string, any>,
  tokenMeta: TokenMeta,
  tokenJson: TokenJson,
  compTokenTypeMap: Map<string, string>,
): string {
  const sections: string[] = [];
  const fontFamily = String(aliasToken.fontFamily).replace(/\n/g, ' ').trim();

  // --- Section 1: 概述 ---
  sections.push(`## 概述 {#overview}`);

  sections.push(
    `Ant Design 是一套企业级 UI 设计语言和 React 组件库，建立在四个设计价值观之上：**自然**、**确定性**、**意义感**和**生长性**。这些价值观指导从 Token 命名到交互模式的每一个决策，确保系统直觉易用、行为可预测、目标明确且可扩展。`,
  );
  sections.push(
    `主题定制通过 \`ConfigProvider\` 管理，它包裹你的应用并将设计 Token 沿组件树向下传递。Token 系统分为四层：`,
  );
  sections.push(`- **种子 Token**（如 \`colorPrimary\`、\`fontSize\`）是定制的入口点。`);
  sections.push(
    `- **映射 Token** 将种子值转换为中间梯度（例如 \`${String(aliasToken.colorPrimary)}\` 生成包含 hover、active 和背景变体的完整色板）。`,
  );
  sections.push(
    `- **别名 Token** 提供语义化名称，将 Token 映射到其角色（如 \`colorText\`、\`colorBgContainer\`）。`,
  );
  sections.push(`- **组件 Token** 在组件级别覆盖别名和映射 Token，实现精细控制。`);
  sections.push(
    `提供三种算法预设：\`default\`（亮色主题）、\`dark\`（暗色主题）和 \`compact\`（紧凑布局）。你也可以通过组合预设创建自定义算法。支持 CSS Variables 模式（\`cssVar: true\`），可用于运行时主题切换和 SSR 水合。`,
  );
  sections.push(``);
  sections.push(`**核心特性：**`);
  sections.push(`- 种子驱动：修改一个颜色，自动推导完整 10 级色板`);
  sections.push(`- 语义化 Token 名称，描述用途而非外观`);
  sections.push(`- 组件级 Token 覆盖，实现精确定制`);
  sections.push(`- 内置暗色模式算法，自动颜色反转`);
  sections.push(`- 紧凑算法，适合空间高效布局`);
  sections.push(`- CSS Variables 支持，运行时主题切换`);
  sections.push(`- RTL 感知的布局 Token`);
  sections.push(``);

  // --- Section 2: 色彩 ---
  sections.push(`## 色彩 {#colors}`);

  const colorTableCols = ['Token', 'CSS 变量', '默认值', '分类'];
  sections.push(mdTableHeader(colorTableCols));
  sections.push(mdTableDivider(colorTableCols.length));
  for (const group of COLOR_GROUPS) {
    for (const token of group.tokens) {
      const val = aliasToken[token];
      if (val !== undefined) {
        const cssVar = `--ant-${camelToKebab(token)}`;
        const groupLabelMap: Record<string, string> = {
          Brand: '品牌',
          Functional: '功能',
          Text: '文本',
          Background: '背景',
          Border: '边框',
          Fill: '填充',
          Link: '链接',
          Highlight: '高亮',
          Icon: '图标',
          Control: '控件',
        };
        const formatted =
          isColorValue(val) || typeof val === 'string' ? `\`${String(val)}\`` : `\`${val}\``;
        sections.push(
          mdTableRow([
            `\`${token}\``,
            `\`${cssVar}\``,
            formatted,
            groupLabelMap[group.group] || group.group,
          ]),
        );
      }
    }
  }
  sections.push(``);
  sections.push(
    `色彩系统从一个种子颜色（\`colorPrimary\`）自动推导所有色板。默认算法使用基于 HSL 的亮度偏移生成每个色相的 10 级色阶，确保 hover、active 和背景状态之间的对比度一致。要自定义，只需在 \`ConfigProvider\` 的 theme token 中设置 \`colorPrimary\`，整个色板将自动重新计算。`,
  );
  sections.push(
    `功能色（\`colorError\`、\`colorWarning\`、\`colorSuccess\`、\`colorInfo\`）遵循相同的推导算法，可以独立覆盖。`,
  );
  sections.push(``);

  // --- Section 3: 排版 ---
  sections.push(`## 排版 {#typography}`);

  const typoCols = ['层级', '字体', '大小', '字重', '行高'];
  sections.push(mdTableHeader(typoCols));
  sections.push(mdTableDivider(typoCols.length));
  for (const level of TYPOGRAPHY_LEVELS) {
    const fontSize = aliasToken[level.fontSizeToken];
    const lineHeight = aliasToken[level.lineHeightToken];
    sections.push(
      mdTableRow([
        `\`${level.key}\``,
        `{fonts.sans}`,
        `\`${fontSize}px\``,
        String(level.fontWeight),
        String(lineHeight),
      ]),
    );
  }
  sections.push(``);
  sections.push(
    `默认字体栈优先使用系统字体以确保各平台最佳渲染效果：${fontFamily}。代码块和行内代码使用等宽字体栈：\`${String(aliasToken.fontFamilyCode).replace(/\n/g, ' ').trim()}\`。`,
  );
  sections.push(``);

  // --- Section 4: 布局与间距 ---
  sections.push(`## 布局与间距 {#layout}`);

  const spacingCols = ['Token', 'CSS 变量', '值'];
  sections.push(mdTableHeader(spacingCols));
  sections.push(mdTableDivider(spacingCols.length));
  const spacingTokens: [string, string][] = [
    ['xxs', 'paddingXXS'],
    ['xs', 'paddingXS'],
    ['sm', 'paddingSM'],
    ['md', 'padding'],
    ['lg', 'paddingLG'],
    ['xl', 'paddingXL'],
    ['xxl', 'marginXXL'],
  ];
  for (const [, token] of spacingTokens) {
    const val = aliasToken[token];
    const cssVar = `--ant-${camelToKebab(token)}`;
    sections.push(mdTableRow([`\`${token}\``, `\`${cssVar}\``, `\`${val}px\``]));
  }
  sections.push(``);

  sections.push(`### 响应式断点`);
  const bpCols = ['断点', '宽度'];
  sections.push(mdTableHeader(bpCols));
  sections.push(mdTableDivider(bpCols.length));
  const breakpoints: [string, number][] = [
    ['xs', 480],
    ['sm', 576],
    ['md', 768],
    ['lg', 992],
    ['xl', 1200],
    ['xxl', 1600],
  ];
  for (const [name, width] of breakpoints) {
    sections.push(mdTableRow([name, `>= ${width}px`]));
  }
  sections.push(``);

  sections.push(`### 背景层级`);
  sections.push(`Ant Design 使用三层背景系统传达视觉层级：`);
  sections.push(
    `- **\`colorBgLayout\`**（\`${aliasToken.colorBgLayout}\`）— 最外层画布，位于所有容器之后。`,
  );
  sections.push(
    `- **\`colorBgContainer\`**（\`${aliasToken.colorBgContainer}\`）— 默认容器表面，用于卡片、面板和输入框。`,
  );
  sections.push(
    `- **\`colorBgElevated\`**（\`${aliasToken.colorBgElevated}\`）— 浮层表面，如下拉菜单、工具提示和气泡卡片，出现在容器层之上。`,
  );
  sections.push(``);

  // --- Section 5: 层级与深度 ---
  sections.push(`## 层级与深度 {#elevation}`);

  const shadowCols = ['级别', 'Token', 'CSS 变量', '默认值'];
  sections.push(mdTableHeader(shadowCols));
  sections.push(mdTableDivider(shadowCols.length));
  for (const s of SHADOW_TOKENS) {
    const rawVal = String(aliasToken[s.token] ?? '');
    const normalized = normalizeShadow(rawVal);
    const cssVar = `--ant-${camelToKebab(s.token)}`;
    const shadowLabelMap: Record<string, string> = {
      default: '默认',
      secondary: '二级',
      tertiary: '三级',
      card: '卡片',
    };
    sections.push(
      mdTableRow([
        shadowLabelMap[s.key] || s.key,
        `\`${s.token}\``,
        `\`${cssVar}\``,
        escapeMdTablePipe(`\`${normalized}\``),
      ]),
    );
  }
  sections.push(``);

  sections.push(`### 阴影哲学`);
  sections.push(
    `阴影传达层级感。默认阴影（\`boxShadow\`）用于气泡卡片和浮动元素。\`boxShadowSecondary\` 为弹窗和抽屉增加深度。\`boxShadowTertiary\` 为行内凸起元素提供最轻微的提升。\`boxShadowCard\` 针对卡片表面调优。保持阴影最小化——过多的深度会造成视觉噪音。`,
  );
  sections.push(``);

  sections.push(`### 动效`);
  const motionCols = ['Token', 'CSS 变量', '默认值'];
  sections.push(mdTableHeader(motionCols));
  sections.push(mdTableDivider(motionCols.length));
  for (const m of MOTION_TOKENS) {
    const val = aliasToken[m.token];
    const cssVar = `--ant-${camelToKebab(m.token)}`;
    if (val !== undefined) {
      sections.push(mdTableRow([`\`${m.token}\``, `\`${cssVar}\``, `\`${String(val)}\``]));
    }
  }
  sections.push(``);

  sections.push(
    `- **快速**（\`${aliasToken.motionDurationFast}\`）：微交互——悬停高亮、开关切换、聚焦环。`,
  );
  sections.push(
    `- **中等**（\`${aliasToken.motionDurationMid}\`）：标准过渡——折叠展开、标签切换、下拉菜单出现。`,
  );
  sections.push(
    `- **缓慢**（\`${aliasToken.motionDurationSlow}\`）：重要布局变化——弹窗进入、抽屉滑入、页面过渡。`,
  );
  sections.push(``);
  sections.push(
    `元素进入视口时使用 **ease-out** 曲线，连续或可逆动画使用 **ease-in-out** 曲线。\`ease-in-back\`/\`ease-out-back\` 组合产生轻微的过冲效果，适合展开/折叠模式。`,
  );
  sections.push(``);
  sections.push(`### 常见过渡模式`);
  sections.push(
    `- **展开/折叠**：\`motionDurationMid\` + \`motionEaseOutQuad\` 或 \`motionEaseOutBack\``,
  );
  sections.push(`- **淡入淡出**：\`motionDurationFast\` + \`motionEaseOut\``);
  sections.push(`- **滑动**：\`motionDurationMid\` + \`motionEaseOutCirc\``);
  sections.push(`- **遮罩层**：\`motionDurationSlow\` + \`motionEaseOutQuint\``);
  sections.push(``);

  // --- Section 6: 形状 ---
  sections.push(`## 形状 {#shapes}`);

  const shapeCols = ['档位', 'Token', '值'];
  sections.push(mdTableHeader(shapeCols));
  sections.push(mdTableDivider(shapeCols.length));
  const shapeEntries: [string, string, string][] = [
    ['none', '-', '0'],
    ['xs', 'borderRadiusXS', `${aliasToken.borderRadiusXS}px`],
    ['sm', 'borderRadiusSM', `${aliasToken.borderRadiusSM}px`],
    ['DEFAULT', 'borderRadius', `${aliasToken.borderRadius}px`],
    ['lg', 'borderRadiusLG', `${aliasToken.borderRadiusLG}px`],
  ];
  for (const [scale, token, value] of shapeEntries) {
    sections.push(mdTableRow([scale, token ? `\`${token}\`` : '-', `\`${value}\``]));
  }
  sections.push(``);

  sections.push(`### 组件形状指南`);
  sections.push(
    `- **按钮、输入框、选择器**：使用 \`borderRadius\`（默认值）以保持表单元素外观一致。`,
  );
  sections.push(`- **卡片、弹窗**：使用 \`borderRadiusLG\`，适用于较大的容器元素。`);
  sections.push(
    `- **标签、徽标、头像**：使用 \`borderRadiusSM\`，适用于小型行内元素；或 \`borderRadiusXS\` 产生轻微圆角。`,
  );
  sections.push(`- **工具提示、气泡卡片**：使用 \`borderRadiusLG\`，以区分浮动面板与行内元素。`);
  sections.push(``);

  // --- Section 7: 组件 ---
  sections.push(`## 组件 {#components}`);

  sections.push(`> 所有组件均支持 \`classNames\` 和 \`styles\` 属性，用于子元素级别的自定义。`);
  sections.push(``);

  for (const compName of CORE_COMPONENTS) {
    sections.push(`### ${compName}`);
    const table = buildComponentTokenTable(
      compName,
      aliasToken,
      tokenMeta,
      tokenJson,
      compTokenTypeMap,
      'zh',
    );
    if (table) {
      sections.push(table);
    } else {
      sections.push(`_暂无组件 Token。_`);
    }
    sections.push(``);
  }

  // --- Section 8: 最佳实践 ---
  sections.push(`## 最佳实践 {#dos-and-donts}`);

  const dosDonts: [string, string][] = [
    ['推荐', '让算法从 `colorPrimary` 自动推导色板。仅在算法无法满足特定品牌色需求时才手动覆盖。'],
    [
      '避免',
      '为 hover、active 或背景状态硬编码十六进制值。始终使用推导的语义化 Token，以确保暗色模式正常工作。',
    ],
    [
      '推荐',
      '使用语义化 Token（`colorText`、`colorBgContainer`）而非原始颜色值。语义化 Token 能自动适应算法变化。',
    ],
    [
      '避免',
      '在同一视觉区域创建多个不同主题的 `ConfigProvider` 实例。建议在应用根节点使用单一 Provider。',
    ],
    [
      '推荐',
      '在应用根节点使用单一 `ConfigProvider` 集中管理主题。仅在需要明确的主题区域时使用嵌套 Provider。',
    ],
    ['避免', '引用以 `INTERNAL_` 开头的内部或私有 Token 名称。这些是实现细节，可能在版本间变更。'],
    ['推荐', '使用圆角梯度（`borderRadiusXS` 至 `borderRadiusLG`）而非任意像素值，以保持一致性。'],
    ['避免', '使用超过 `motionDurationSlow`（0.3s）的动画时长。过长的时长会降低感知响应速度。'],
    [
      '推荐',
      '保持阴影微妙。轻微提升优先使用 `boxShadowTertiary`，将 `boxShadow` 留给气泡卡片和浮层。',
    ],
    [
      '避免',
      '自定义颜色时跳过对比度测试。同时覆盖 `colorText`、`colorBgContainer` 和功能色，然后验证 WCAG 2.1 AA 合规性。',
    ],
  ];

  for (const [label, text] of dosDonts) {
    const icon = label === '推荐' ? '\u2705' : '\u274C';
    sections.push(`- ${icon} **${label}**：${text}`);
  }
  sections.push(``);

  // --- Section 9: AI 代理指南 ---
  sections.push(`## AI 代理指南 {#agent-prompt-guide}`);

  sections.push(`### 快速颜色参考`);
  const quickColorCols = ['名称', 'Token', '默认值'];
  sections.push(mdTableHeader(quickColorCols));
  sections.push(mdTableDivider(quickColorCols.length));
  const quickColorsZh: [string, string][] = [
    ['品牌色', 'colorPrimary'],
    ['错误色', 'colorError'],
    ['警告色', 'colorWarning'],
    ['成功色', 'colorSuccess'],
    ['信息色', 'colorInfo'],
    ['文本色', 'colorText'],
    ['次要文本色', 'colorTextSecondary'],
    ['容器背景', 'colorBgContainer'],
    ['布局背景', 'colorBgLayout'],
    ['边框色', 'colorBorder'],
  ];
  for (const [name, token] of quickColorsZh) {
    const val = aliasToken[token];
    sections.push(mdTableRow([name, `\`${token}\``, `\`${String(val)}\``]));
  }
  sections.push(``);

  sections.push(`### 组件提示示例`);
  sections.push(
    `1. \`创建一个主色为 #722ed1 的 Button，通过 ConfigProvider 设置 colorPrimary，并覆盖 Button.componentToken 控制 padding。\``,
  );
  sections.push(
    `2. \`构建一个交替行色的数据 Table，使用 token colorFillAlter，并通过 Table.componentToken.headerBg 自定义表头样式。\``,
  );
  sections.push(
    `3. \`设计一个暗色模式 Dashboard，使用 algorithm: theme.darkAlgorithm，覆盖 colorBgLayout 为 #141414，并调整 Card token 适配浮层表面。\``,
  );
  sections.push(
    `4. \`实现紧凑表单布局，使用 algorithm: theme.compactAlgorithm，然后微调 Input.componentToken.paddingBlockSM 缩小间距。\``,
  );
  sections.push(
    `5. \`创建通知系统，使用 Notification.componentToken 自定义宽度、添加自定义内边距，并与品牌 colorPrimary 保持一致。\``,
  );
  sections.push(``);

  sections.push(`### 不可协商的迭代规则`);
  const rules: string[] = [
    '绝不绕过 ConfigProvider 进行主题设置——始终通过 Provider 树传递 Token。',
    '始终从种子颜色算法推导 hover/active/背景变体，而非硬编码单独的色阶。',
    '添加新表面时维持三层背景层级（布局 → 容器 → 浮层）。',
    '所有动画使用动效 Token——绝不内联硬编码时长或缓动值。',
    '遵循圆角梯度；不在 5 级体系之外引入任意 border-radius 值。',
    '发布前在亮色和暗色算法下测试所有自定义主题。',
    '保持组件 Token 覆盖最小化——优先通过全局 Token 变更实现广泛一致性。',
    '自定义文本或背景颜色时确保 WCAG 2.1 AA 对比度（普通文本 4.5:1）。',
    '添加新组件时遵循 Token 命名约定：组件范围 Token 以组件名的 camelCase 形式为前缀。',
  ];
  for (let i = 0; i < rules.length; i++) {
    sections.push(`${i + 1}. ${rules[i]}`);
  }
  sections.push(``);

  return sections.join('\n');
}

// ============================================================
// Main generator
// ============================================================

async function main() {
  // 1. Load data
  const aliasToken = getDesignToken() as Record<string, any>;

  const tokenMetaPath = path.join(__dirname, '..', 'components', 'version', 'token-meta.json');
  const tokenMeta: TokenMeta = await fs.readJson(tokenMetaPath);

  const tokenJsonPath = path.join(__dirname, '..', 'components', 'version', 'token.json');
  const tokenJson: TokenJson = await fs.readJson(tokenJsonPath);

  const majorVersion = getMajorVersion(version);

  // 2. Build reference resolution maps
  const globalValueMap = buildGlobalTokenValueMap(aliasToken);
  const colorKeyMap = buildColorKeyMap();
  const shadowKeyMap = buildShadowKeyMap();
  const roundedKeyMap = buildRoundedKeyMap(aliasToken);
  const typographyKeyMap = buildTypographyKeyMap(aliasToken);

  // 3. Build YAML string

  const lines: string[] = [];

  // --- Front matter ---
  lines.push(`name: "Ant Design"`);
  lines.push(`description: "Enterprise-class UI design language and React component library"`);

  // --- themeConfig ---
  lines.push('themeConfig:');
  lines.push(`  antdVersion: "${majorVersion}"`);
  lines.push(`  provider: "ConfigProvider"`);
  lines.push(`  algorithm: [default, dark, compact]`);
  lines.push(`  customizable: true`);
  lines.push(`  tokenLayers: [seed, map, alias, component]`);
  lines.push(`  cssVar: true`);
  lines.push(`  cssVarPrefix: "--ant"`);

  // --- fonts ---
  lines.push('fonts:');
  const fontFamily = String(aliasToken.fontFamily).replace(/\n/g, ' ').trim();
  const fontFamilyCode = String(aliasToken.fontFamilyCode).replace(/\n/g, ' ').trim();
  lines.push(`  sans: ${quoteYaml(fontFamily)}`);
  lines.push(`  code: ${quoteYaml(fontFamilyCode)}`);

  // --- colors ---
  lines.push('colors:');
  for (const group of COLOR_GROUPS) {
    lines.push(`  # ${group.group}`);
    for (const token of group.tokens) {
      const yamlKey = colorTokenToYamlKey(token);
      const val = aliasToken[token];
      if (val !== undefined) {
        lines.push(`  ${yamlKey}: ${yamlScalar(val, 1)}`);
      }
    }
  }

  // --- typography ---
  lines.push('typography:');
  for (const level of TYPOGRAPHY_LEVELS) {
    const fontSize = aliasToken[level.fontSizeToken];
    const lineHeight = aliasToken[level.lineHeightToken];
    lines.push(`  ${level.key}:`);
    lines.push(`    fontFamily: "{fonts.sans}"`);
    lines.push(`    fontSize: "${fontSize}px"`);
    lines.push(`    fontWeight: ${level.fontWeight}`);
    lines.push(`    lineHeight: ${lineHeight}`);
  }

  // --- rounded ---
  lines.push('rounded:');
  lines.push(`  none: 0`);
  lines.push(`  xs: "${aliasToken.borderRadiusXS}px"`);
  lines.push(`  sm: "${aliasToken.borderRadiusSM}px"`);
  lines.push(`  DEFAULT: "${aliasToken.borderRadius}px"`);
  lines.push(`  lg: "${aliasToken.borderRadiusLG}px"`);

  // --- spacing ---
  lines.push('spacing:');
  lines.push(`  xxs: "${aliasToken.paddingXXS}px"`);
  lines.push(`  xs: "${aliasToken.paddingXS}px"`);
  lines.push(`  sm: "${aliasToken.paddingSM}px"`);
  lines.push(`  md: "${aliasToken.padding}px"`);
  lines.push(`  lg: "${aliasToken.paddingLG}px"`);
  lines.push(`  xl: "${aliasToken.paddingXL}px"`);
  lines.push(`  xxl: "${aliasToken.marginXXL}px"`);

  // --- motion ---
  lines.push('motion:');
  for (const m of MOTION_TOKENS) {
    const val = aliasToken[m.token];
    if (val !== undefined) {
      lines.push(`  ${m.key}: ${yamlScalar(val, 1)}`);
    }
  }

  // --- shadows ---
  lines.push('shadows:');
  for (const s of SHADOW_TOKENS) {
    const rawVal = String(aliasToken[s.token] ?? '');
    const normalized = normalizeShadow(rawVal);
    lines.push(`  ${s.key}: ${yamlScalar(normalized, 1)}`);
  }

  // --- Build component token type lookup from token-meta ---
  const compTokenTypeMap = new Map<string, string>(); // "CompName.tokenName" -> type
  for (const compName of CORE_COMPONENTS) {
    const compMeta = tokenMeta.components[compName];
    if (compMeta) {
      for (const t of compMeta) {
        compTokenTypeMap.set(`${compName}.${t.token}`, t.type);
      }
    }
  }

  // --- components ---
  lines.push('components:');

  for (const compName of CORE_COMPONENTS) {
    const compTokenJson = tokenJson[compName];

    if (!compTokenJson) {
      // Component exists in our list but not in token.json - still output section
      lines.push(`  ${camelToKebab(compName)}: {}`);
      continue;
    }

    const componentTokens = compTokenJson.component || {};
    const tokenEntries = Object.entries(componentTokens);

    // Filter tokens
    const filteredEntries = tokenEntries.filter(
      ([name, value]) => !shouldFilterComponentToken(name, value),
    );

    if (filteredEntries.length === 0) {
      lines.push(`  ${camelToKebab(compName)}: {}`);
      continue;
    }

    lines.push(`  ${camelToKebab(compName)}:`);

    for (const [tokenName, rawValue] of filteredEntries) {
      // Try to resolve to a global token reference
      const resolved = resolveComponentTokenValue(
        tokenName,
        rawValue,
        colorKeyMap,
        shadowKeyMap,
        roundedKeyMap,
        typographyKeyMap,
        globalValueMap,
        aliasToken,
      );

      const yamlKey = camelToKebab(tokenName);

      if (resolved) {
        lines.push(`    ${yamlKey}: ${resolved}`);
      } else {
        // Determine formatting options from token-meta type
        const metaType = compTokenTypeMap.get(`${compName}.${tokenName}`) ?? '';
        const isFontWeight = metaType.includes('FontWeight') || /fontWeight$/i.test(tokenName);
        // LineHeight tokens: unitless when the value is a decimal < 10
        // (Used in typography contexts like "1.5"), but px-based when the
        // value represents an actual CSS line-height in px (like Steps.titleLineHeight = 32).
        // We detect by combining meta type info + name pattern + heuristics on the value.
        const isLineHeightNamePattern = /LineHeight/i.test(tokenName);
        const isUnitlessLineHeight =
          (metaType.includes('LineHeight') || isLineHeightNamePattern) &&
          typeof rawValue === 'number' &&
          rawValue < 10;
        const isBoolean = typeof rawValue === 'boolean' || metaType === 'boolean';
        const isScale = /Scale$/i.test(tokenName);

        const formatted = formatTokenValue(rawValue, {
          isLineHeight: isUnitlessLineHeight,
          isFontWeight,
          isScale,
          isBoolean,
        });

        // Check if value is a multiline shadow-like value
        if (typeof rawValue === 'string' && rawValue.includes('\n')) {
          lines.push(yamlLiteralKeyValue(yamlKey, normalizeShadow(rawValue), 2));
        } else if (
          typeof rawValue === 'string' &&
          rawValue.includes(',') &&
          (rawValue.includes('rgba') || rawValue.includes('0 '))
        ) {
          // Likely a shadow or complex value - normalize and quote
          const normalized = normalizeShadow(rawValue);
          lines.push(`    ${yamlKey}: ${quoteYaml(normalized)}`);
        } else {
          lines.push(`    ${yamlKey}: ${formatted}`);
        }
      }
    }
  }

  lines.push('---');
  lines.push(''); // trailing newline

  // Remove the trailing "---" and blank line from lines so we can reassemble YAML front matter
  // Current lines end with '---' and ''
  const yamlLines = lines.slice(0, -2); // remove trailing '---' and ''
  const yamlStr = yamlLines.join('\n');

  // 4. Generate prose sections
  const englishProse = generateEnglishProse(
    majorVersion,
    aliasToken,
    tokenMeta,
    tokenJson,
    compTokenTypeMap,
  );
  const chineseProse = generateChineseProse(
    majorVersion,
    aliasToken,
    tokenMeta,
    tokenJson,
    compTokenTypeMap,
  );

  // 5. Assemble final content: YAML front matter + prose
  const enContent = `---\n${yamlStr}\n---\n\n${englishProse}\n`;
  const zhContent = `---\n${yamlStr}\n---\n\n${chineseProse}\n`;

  // 6. Write output files
  const enOutputPath = path.join(__dirname, '..', 'DESIGN.md');
  const zhOutputPath = path.join(__dirname, '..', 'DESIGN.zh-CN.md');

  await fs.writeFile(enOutputPath, enContent, 'utf8');
  await fs.writeFile(zhOutputPath, zhContent, 'utf8');

  console.log(`Generated DESIGN.md (${enOutputPath})`);
  console.log(`Generated DESIGN.zh-CN.md (${zhOutputPath})`);
  console.log(`Version: ${majorVersion}`);
  console.log(`Components: ${CORE_COMPONENTS.length}`);
  console.log(`Global tokens loaded: ${Object.keys(tokenMeta.global).length}`);
}

main().catch((err) => {
  console.error('Error generating DESIGN.md:', err);
  process.exit(1);
});
