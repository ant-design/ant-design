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
  lines.push('---');
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

  const yamlContent = lines.join('\n');

  // 4. Write output files
  const enOutputPath = path.join(__dirname, '..', 'DESIGN.md');
  const zhOutputPath = path.join(__dirname, '..', 'DESIGN.zh-CN.md');

  // For now, both files contain the same YAML front matter
  // (prose content will be added in later tasks)
  const enContent = yamlContent;
  const zhContent = yamlContent;

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
