import * as React from 'react';
import classNames from 'classnames';
import RcRate from 'rc-rate';
import StarFilled from '@ant-design/icons/StarFilled';

import Tooltip from '../tooltip';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface RateProps {
  prefixCls?: string;
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  tooltips?: Array<string>;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  character?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface RateNodeProps {
  index: number;
}

const Rate = React.forwardRef<unknown, RateProps>(({ prefixCls, tooltips, ...props }, ref) => {
  const characterRender = (node: React.ReactElement, { index }: RateNodeProps) => {
    if (!tooltips) return node;
    return <Tooltip title={tooltips[index]}>{node}</Tooltip>;
  };

  const { getPrefixCls, iconPrefixCls, direction } = React.useContext(ConfigContext);
  const ratePrefixCls = getPrefixCls('rate', prefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(ratePrefixCls, iconPrefixCls);

  return wrapSSR(
    <RcRate
      ref={ref}
      characterRender={characterRender}
      {...props}
      className={classNames(props.className, hashId)}
      prefixCls={ratePrefixCls}
      direction={direction}
    />,
  );
});

Rate.displayName = 'Rate';

Rate.defaultProps = {
  character: <StarFilled />,
};

export default Rate;
