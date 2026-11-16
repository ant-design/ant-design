import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import vm from 'node:vm';
import type { SizeLimitConfig } from 'size-limit';

const root = path.resolve(__dirname, '..');
const requireModule = createRequire(path.join(root, '.size-limit.cjs'));
const configSource = fs.readFileSync(path.join(root, '.size-limit.cjs'), 'utf8');
const publicExports = fs.readFileSync(path.join(root, 'components/index.ts'), 'utf8');

const loadConfig = (source = publicExports): SizeLimitConfig => {
  const configModule = { exports: [] };
  vm.runInNewContext(configSource, {
    __dirname: root,
    module: configModule,
    require: (id: string) => {
      return id === 'node:fs' ? { readFileSync: () => source } : requireModule(id);
    },
  });
  return configModule.exports;
};

describe('size-limit', () => {
  it('requires a budget for a new public component', () => {
    expect(() =>
      loadConfig(`${publicExports}\nexport { default as NewComponent } from './new-component';`),
    ).toThrow('Add a size budget for NewComponent to .size-limit.cjs.');
  });
  it('recognizes multiline exports', () => {
    expect(() =>
      loadConfig('export {\n default as NewComponent,\n} from "./new-component";'),
    ).toThrow('Add a size budget for NewComponent to .size-limit.cjs.');
  });
  it('ignores type-only exports', () => {
    expect(
      loadConfig(`${publicExports}
        export type { default as NewProps } from './new-component';
        export { type default as OtherProps } from './other-component';
      `),
    ).toEqual(loadConfig());
  });
});
