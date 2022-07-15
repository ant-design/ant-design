import * as React from 'react';
import classNames from 'classnames';
import { Popup } from 'rc-tooltip';
import type { PopoverProps } from '.';
import { ConfigContext } from '../config-provider';

import useStyle from './style';
import { getRenderPropValue } from '../_util/getRenderPropValue';

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

export default function PurePanel(props: any) {
  const {
    prefixCls: customizePrefixCls,
    className,
    placement = 'top',
    title,
    content,
    children,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div
      className={classNames(
        hashId,
        prefixCls,
        `${prefixCls}-pure`,
        `${prefixCls}-placement-${placement}`,
        className,
      )}
    >
      <Popup {...props} className={hashId} prefixCls={prefixCls}>
        {children || getOverlay(prefixCls, title, content)}
      </Popup>
    </div>,
  );
}
