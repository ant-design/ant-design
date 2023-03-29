import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React from 'react';
import Tag from '../tag';

const genDefaultRender = (rootCls: string) => (props: CustomTagProps) => {
  const { label, ...rest } = props;
  return (
    <Tag {...rest} className={`${rootCls}-select-tag`} bordered={false}>
      {props.closable ? label : <span className={`${rootCls}-tag-content`}>{label}</span>}
    </Tag>
  );
};

export default genDefaultRender;
