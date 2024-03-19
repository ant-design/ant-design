import * as React from 'react';
import classNames from 'classnames';
import { Popup } from 'rc-tooltip';

import type { PopoverProps } from '.';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export const getOverlay = (
  prefixCls?: string,
  title?: PopoverProps['title'],
  content?: PopoverProps['content'],
) => {
  if (!title && !content) {
    return null;
  }
  return (
    <>
      {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
      <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
    </>
  );
};

export interface PurePanelProps extends Omit<PopoverProps, 'children'> {
  children?: React.ReactNode;
}

interface RawPurePanelProps extends PopoverProps {
  hashId: string;
}

export const RawPurePanel: React.FC<RawPurePanelProps> = (props) => {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = 'top',
    title,
    content,
    children,
  } = props;

  return (
    <div
      className={classNames(
        hashId,
        prefixCls,
        `${prefixCls}-pure`,
        `${prefixCls}-placement-${placement}`,
        className,
      )}
      style={style}
    >
      <div className={`${prefixCls}-arrow`} />
      <Popup {...props} className={hashId} prefixCls={prefixCls}>
        {children || getOverlay(prefixCls, title, content)}
      </Popup>
    </div>
  );
};

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  return wrapCSSVar(
    <RawPurePanel
      {...restProps}
      prefixCls={prefixCls}
      hashId={hashId}
      className={classNames(className, cssVarCls)}
    />,
  );
};

export default PurePanel;
