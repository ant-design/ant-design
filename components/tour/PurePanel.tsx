import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { RawPurePanel as PopoverRawPurePanel } from '../popover/PurePanel';
import type { TourStepProps } from './interface';
import TourPanel from './panelRender';
import useStyle from './style';
import useCSSVar from './style/cssVar';
import { withPureRenderTheme } from '../_util/PurePanel';

export interface PurePanelProps extends TourStepProps {}

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    current = 0,
    total = 6,
    className,
    style,
    type,
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);

  const [, hashId] = useStyle(prefixCls);
  const wrapCSSVar = useCSSVar(prefixCls);

  return wrapCSSVar(
    <PopoverRawPurePanel
      prefixCls={prefixCls}
      hashId={hashId}
      className={classNames(className, `${prefixCls}-pure`, type && `${prefixCls}-${type}`)}
      style={style}
    >
      <TourPanel stepProps={{ ...restProps, prefixCls, total }} current={current} type={type} />
    </PopoverRawPurePanel>,
  );
};

export default withPureRenderTheme(PurePanel);
