import * as React from 'react';
import classNames from 'classnames';
import { Popup } from 'rc-tooltip';

import type { PopoverProps } from '.';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

interface OverlayProps {
  prefixCls?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ title, content, prefixCls }) => {
  if (!title && !content) {
    return null;
  }
  return (
    <>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {content && <div className={`${prefixCls}-inner-content`}>{content}</div>}
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

  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);

  const cls = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-placement-${placement}`,
    className,
  );

  return (
    <div className={cls} style={style}>
      <div className={`${prefixCls}-arrow`} />
      <Popup {...props} className={hashId} prefixCls={prefixCls}>
        {children || <Overlay prefixCls={prefixCls} title={titleNode} content={contentNode} />}
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
