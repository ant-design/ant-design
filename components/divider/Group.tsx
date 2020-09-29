import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import Divider from './Divider';

export interface DividerGroupProps {
  dashed?: boolean;
  type?: 'horizontal' | 'vertical';
}

const Group: React.FC<DividerGroupProps> = ({ children, dashed, type = 'vertical' }) => {
  const childNodes = toArray(children);
  if (childNodes.length === 0) {
    return null;
  }

  const nodes = childNodes.map((child, i) => {
    /* eslint-disable react/no-array-index-key */
    return (
      <React.Fragment key={i}>
        {child}
        {i !== childNodes.length - 1 && <Divider type={type} dashed={dashed} />}
      </React.Fragment>
    );
    /* eslint-enable */
  });

  return <div>{nodes}</div>;
};

export default Group;
