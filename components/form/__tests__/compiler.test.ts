import fs from 'node:fs';
import path from 'node:path';

import * as babel from '@babel/core';
import getBabelCommonConfig from '@ant-design/tools/lib/getBabelCommonConfig';

describe('Form compiler output', () => {
  const files = [
    '../FormItem/index.tsx',
    '../FormList.tsx',
    '../hooks/useFormItemStatus.ts',
    '../hooks/useFormWarning.ts',
  ];

  it.each(files)('should not memoize warning hook in %s with React Compiler', (file) => {
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
    expect(result?.code).not.toContain('react.memo_cache_sentinel');
  });
});
