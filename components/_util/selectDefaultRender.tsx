import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React from 'react';
import Tag from '../tag';

const genDefaultRender = (rootCls: string) => ({ label, ...rest }: CustomTagProps) =>
  (
    <Tag {...rest} className={`${rootCls}-select-tag`} bordered={false}>
      {label}
    </Tag>
  );

export default genDefaultRender;
