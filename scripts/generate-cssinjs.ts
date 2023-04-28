import { globSync } from 'glob';
import path from 'path';
import React from 'react';

type StyleFn = (prefix?: string) => void;

const styleFiles = globSync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|auto-complete|col|row|time-picker)/style/index.?(ts|tsx)',
  ),
);

const generate = {
  generateCssinjs({ key, beforeRender, render }: any) {
    const EmptyElement = React.createElement('div');
    styleFiles.forEach(async (file) => {
      const pathArr = file.split('/');
      const styleIndex = pathArr.lastIndexOf('style');
      const componentName = pathArr[styleIndex - 1];
      let useStyle: StyleFn = () => {};
      if (file.includes('grid')) {
        const { useColStyle, useRowStyle } = await import(file);
        useStyle = (prefixCls: string) => {
          useRowStyle(prefixCls);
          useColStyle(prefixCls);
        };
      } else {
        useStyle = (await import(file)).default;
      }
      const Component: React.FC = () => {
        useStyle(`${key}-${componentName}`);
        return EmptyElement;
      };
      beforeRender?.(componentName);
      render?.(Component);
    });
  },
  filenames: styleFiles,
};

export default generate;
