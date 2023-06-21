import classNames from 'classnames';
import { Popup } from 'rc-tooltip';
import * as React from 'react';
import type { PopoverProps } from '.';
import { ConfigContext } from '../config-provider';

import { getRenderPropValue } from '../_util/getRenderPropValue';
import useStyle from './style';

export const getOverlay = (
  prefixCls: string,
  title?: PopoverProps['title'],
  content?: PopoverProps['content'],
) => {
  if (!title && !content) return undefined;
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

export function RawPurePanel(props: any) {
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
}

export default function PurePanel(props: any) {
  const { prefixCls: customizePrefixCls, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(<RawPurePanel {...restProps} prefixCls={prefixCls} hashId={hashId} />);
}
