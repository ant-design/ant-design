import { globSync } from 'glob';
import path from 'path';
import React from 'react';

type StyleFn = (prefix?: string) => void;

interface GenCssinjsOptions {
  key: string;
  render: (component: React.FC) => void;
  beforeRender?: (componentName: string) => void;
}

export const styleFiles = globSync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|auto-complete|col|row|time-picker)/style/index.?(ts|tsx)',
  ),
);

export const generateCssinjs = ({ key, beforeRender, render }: GenCssinjsOptions) =>
  Promise.all(
    styleFiles.map(async (file) => {
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
      const Demo: React.FC = () => {
        useStyle(`${key}-${componentName}`);
        return React.createElement('div');
      };
      beforeRender?.(componentName);
      render?.(Demo);
    }),
  );
