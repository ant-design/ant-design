import fs from 'node:fs';
import path from 'node:path';

import * as babel from '@babel/core';
import getBabelCommonConfig from '@ant-design/tools/lib/getBabelCommonConfig';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('Form compiler output', () => {
  const files = [
    ['../FormItem/index.tsx', 'Form.Item', true],
    ['../FormList.tsx', 'Form.List', false],
    ['../hooks/useFormItemStatus.ts', 'Form.Item', false],
    ['../hooks/useFormWarning.ts', 'Form', false],
  ] as const;

  it.each(
    files,
  )('should not cache warning hook call in %s with React Compiler', (file, componentName, shouldMemoize) => {
    const filename = path.resolve(__dirname, file);
    const source = fs.readFileSync(filename, 'utf8');
    const babelConfig = getBabelCommonConfig(false, { enabledReactCompiler: true });
    const result = babel.transformSync(source, {
      ...babelConfig,
      filename,
      babelrc: false,
      configFile: false,
    });

    expect(result).toBeTruthy();
    expect(result?.code).toBeDefined();
    expect(source).not.toContain("'use no memo'");

    const code = result?.code ?? '';
    const warningCallIndex =
      code.match(new RegExp(`useDevWarning\\(["']${escapeRegExp(componentName)}["']\\)`))?.index ??
      -1;

    expect(warningCallIndex).toBeGreaterThan(-1);
    expect(code.lastIndexOf('react.memo_cache_sentinel', warningCallIndex)).toBe(-1);

    if (shouldMemoize) {
      expect(code.indexOf('react.memo_cache_sentinel', warningCallIndex)).toBeGreaterThan(-1);
    }
  });
});
