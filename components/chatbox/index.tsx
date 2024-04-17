import React from 'react';
import classnames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import useTypedEffect from './hooks/useTypedEffect';
import useTypingValue from './hooks/useTypingValue';
import type { ChatboxProps } from './interface';
import Loading from './loading';
import useStyle from './style';

const Chatbox: React.FC<ChatboxProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    classNames,
    styles,
    avatar,
    placement = 'start',
    loading = false,
    typing,
    content,
    contentRender,
  } = props;
  const { direction, chatbox, getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('chatbox', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedTyping = useTypingValue(typing);

  const { typedContent, showCursor } = useTypedEffect(content, mergedTyping);

  const mergedCls = classnames(
    className,
    rootClassName,
    chatbox?.className,
    prefixCls,
    hashId,
    cssVarCls,
    `${prefixCls}-${placement}`,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  const mergedAvatarCls = classnames(
    `${prefixCls}-avatar`,
    classNames?.avatar,
    chatbox?.classNames?.avatar,
  );

  const mergedContentCls = classnames(
    `${prefixCls}-content`,
    classNames?.content,
    chatbox?.classNames?.content,
    { [`${prefixCls}-content-cursor-blink`]: showCursor && !loading && !contentRender },
  );

  const mergedText = mergedTyping !== false ? typedContent : content;

  const mergedContent = contentRender ? contentRender(mergedText) : mergedText;

  return wrapCSSVar(
    <div style={{ ...chatbox?.style, ...style }} className={mergedCls}>
      {avatar && (
        <div style={{ ...chatbox?.styles?.avatar, ...styles?.avatar }} className={mergedAvatarCls}>
          {avatar}
        </div>
      )}
      <div style={{ ...chatbox?.styles?.content, ...styles?.content }} className={mergedContentCls}>
        {loading ? <Loading prefixCls={prefixCls} /> : mergedcontent}
      </div>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Chatbox.displayName = 'Chatbox';
}

export type { ChatboxProps };

export default Chatbox;
