import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import Divider, { DividerProps } from './Divider';
import { ConfigContext } from '../config-provider';

export interface DividerGroupProps extends Omit<DividerProps, 'plain' | 'orientation'> {}

const Group: React.FC<DividerGroupProps> = ({ children, ...props }) => {
  const { direction } = React.useContext(ConfigContext);

  const childNodes = toArray(children);

  if (childNodes.length === 0) {
    return null;
  }

  const nodes = (direction === 'rtl' ? childNodes.reverse() : childNodes).map((child, i) => {
    /* eslint-disable react/no-array-index-key */
    return (
      <React.Fragment key={i}>
        {child}
        {i !== childNodes.length - 1 && <Divider {...props} />}
      </React.Fragment>
    );
    /* eslint-enable */
  });

  return <div>{nodes}</div>;
};

export default Group;
