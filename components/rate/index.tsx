import StarFilled from '@ant-design/icons/StarFilled';
import classNames from 'classnames';
import RcRate from 'rc-rate';
import type { RateProps as RcRateProps, RateRef } from 'rc-rate/lib/Rate';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Tooltip from '../tooltip';
import useStyle from './style';

export interface RateProps extends RcRateProps {
  rootClassName?: string;
  tooltips?: Array<string>;
}

interface RateNodeProps {
  index: number;
}

const Rate = React.forwardRef<RateRef, RateProps>((props, ref) => {
  const {
    prefixCls,
    className,
    rootClassName,
    tooltips,
    character = <StarFilled />,
    ...rest
  } = props;
  const characterRender = (node: React.ReactElement, { index }: RateNodeProps) => {
    if (!tooltips) {
      return node;
    }
    return <Tooltip title={tooltips[index]}>{node}</Tooltip>;
  };

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const ratePrefixCls = getPrefixCls('rate', prefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(ratePrefixCls);

  return wrapSSR(
    <RcRate
      ref={ref}
      character={character}
      characterRender={characterRender}
      {...rest}
      className={classNames(className, rootClassName, hashId)}
      prefixCls={ratePrefixCls}
      direction={direction}
    />,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Rate.displayName = 'Rate';
}

export default Rate;
