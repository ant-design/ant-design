import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';
import { useLoading, LoadingType } from './useLoading';
import LoadingIcon from './LoadingIcon';
import UnreachableException from '../_util/unreachableException';

export interface ButtonGroupProps {
  size?: SizeType;
  loading?: LoadingType;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
  const { 
    prefixCls: customizePrefixCls, 
    size, className,
    loading: propsLoading,
    children,
    ...others 
  } = props;
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn-group', customizePrefixCls);
  const loading = useLoading(propsLoading);

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    case 'middle':
    case undefined:
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn(new UnreachableException(size));
  }

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
 
  return (
    <div {...others} className={classes}>
      {loading && <LoadingIcon existIcon={false} prefixCls={prefixCls} loading={loading} />}
      {children}
    </div>   
  );
}

export default ButtonGroup;
