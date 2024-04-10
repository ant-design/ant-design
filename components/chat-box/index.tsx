import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import useStyle from './style';

export interface ChatBoxProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  avatar?: React.ReactNode;
  placement?: 'start' | 'end';
  loading?: React.ReactNode;
  step?: boolean | { step?: number; interval?: number };
  content?: string;
  contentRender?: (content?: string) => React.ReactNode;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, rootClassName, style, avatar, content } = props;
  const { direction, getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('chatbox', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const mergedCls = classNames(className, rootClassName, prefixCls, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });
  if (typeof content !== 'string') {
    return null;
  }
  return wrapCSSVar(
    <div style={style} className={mergedCls}>
      {avatar}
      {content}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ChatBox.displayName = 'ChatBox';
}

export default ChatBox;
