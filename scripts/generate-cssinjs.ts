import { globSync } from 'glob';
import path from 'path';
import type { FC } from 'react';
import React from 'react';

type StyleFn = (prefix?: string) => void;

type GenCssinjs = (options: {
  key: string;
  render: (component: FC) => void;
  beforeRender?: (componentName: string) => void;
}) => Promise<void>;

export const styleFiles = globSync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|auto-complete|col|row|time-picker)/style/index.?(ts|tsx)',
  ),
);

export const generateCssinjs: GenCssinjs = async ({ key, beforeRender, render }) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const file of styleFiles) {
    const pathArr = file.split('/');
    const styleIndex = pathArr.lastIndexOf('style');
    const componentName = pathArr[styleIndex - 1];
    let useStyle: StyleFn = () => {};
    if (file.includes('grid')) {
      // eslint-disable-next-line no-await-in-loop
      const { useColStyle, useRowStyle } = await import(file);
      useStyle = (prefixCls: string) => {
        useRowStyle(prefixCls);
        useColStyle(prefixCls);
      };
    } else {
      // eslint-disable-next-line no-await-in-loop
      useStyle = (await import(file)).default;
    }
    const Demo: FC = () => {
      useStyle(`${key}-${componentName}`);
      return React.createElement('div');
    };
    beforeRender?.(componentName);
    render?.(Demo);
  }
};
