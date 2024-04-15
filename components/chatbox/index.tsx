import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import Spin from '../spin';
import useTypedEffect from './hooks/useTypedEffect';
import useTypingValue from './hooks/useTypingValue';
import useStyle from './style';

export interface TypingOption {
  /**
   * @since 5.17.0
   * @default 1
   */
  step?: number;
  /**
   * @since 5.17.0
   * @default 100
   */
  interval?: number;
}

export interface ChatboxProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  avatar?: React.ReactNode;
  placement?: 'start' | 'end';
  loading?: boolean;
  typing?: boolean | TypingOption;
  content: string;
  contentRender?: (content?: string) => React.ReactNode;
}

const Chatbox: React.FC<ChatboxProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    avatar,
    placement = 'start',
    loading = false,
    typing,
    content,
    contentRender,
  } = props;
  const { direction, getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('chatbox', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedTyping = useTypingValue(typing);

  const { typedContent, showCursor } = useTypedEffect(content, mergedTyping);

  const mergedCls = classNames(
    className,
    rootClassName,
    prefixCls,
    hashId,
    cssVarCls,
    `${prefixCls}-${placement}`,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  const mergedContent = React.useMemo<React.ReactNode>(() => {
    if (loading) {
      return <Spin />;
    }
    if (mergedTyping !== false) {
      return typedContent;
    }
    return content;
  }, [content, loading, mergedTyping, typedContent]);

  return wrapCSSVar(
    <div style={style} className={mergedCls}>
      {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
      <div
        className={classNames(`${prefixCls}-content`, {
          [`${prefixCls}-content-cursorBlink`]: showCursor && !loading,
        })}
      >
        {contentRender ? contentRender(content) : mergedContent}
      </div>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Chatbox.displayName = 'Chatbox';
}

export default Chatbox;
