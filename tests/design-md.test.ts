import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

import seedToken, { defaultPresetColors } from '../components/theme/themes/seed';

interface Frontmatter {
  colors: Record<string, string>;
  typography: Record<string, { fontSize: string }>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
}

function loadFrontmatter(): Frontmatter {
  const raw = fs.readFileSync(path.join(process.cwd(), 'DESIGN.md'), 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) {
    throw new Error('DESIGN.md is missing YAML front-matter');
  }
  return parse(match[1]) as Frontmatter;
}

function stripPx(value: string): number {
  return Number(value.replace(/px$/, ''));
}

describe('DESIGN.md stays in sync with seed tokens', () => {
  const fm = loadFrontmatter();

  it('primary color matches seed.colorPrimary', () => {
    expect(fm.colors.primary.toLowerCase()).toBe(seedToken.colorPrimary.toLowerCase());
  });

  it('functional colors match seed', () => {
    expect(fm.colors.success.toLowerCase()).toBe(seedToken.colorSuccess.toLowerCase());
    expect(fm.colors.warning.toLowerCase()).toBe(seedToken.colorWarning.toLowerCase());
    expect(fm.colors.error.toLowerCase()).toBe(seedToken.colorError.toLowerCase());
    expect(fm.colors.info.toLowerCase()).toBe(seedToken.colorInfo.toLowerCase());
  });

  it('preset blue matches seed.blue', () => {
    expect(fm.colors.blue.toLowerCase()).toBe(defaultPresetColors.blue.toLowerCase());
  });

  it('rounded.DEFAULT matches seed.borderRadius', () => {
    expect(stripPx(fm.rounded.DEFAULT)).toBe(seedToken.borderRadius);
  });

  it('spacing.unit matches seed.sizeUnit', () => {
    expect(stripPx(fm.spacing.unit)).toBe(seedToken.sizeUnit);
  });

  it('body-md fontSize matches seed.fontSize', () => {
    expect(stripPx(fm.typography['body-md'].fontSize)).toBe(seedToken.fontSize);
  });
});
