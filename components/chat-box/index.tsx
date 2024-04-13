import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import useMergedStep from './hooks/useMergedStep';
import useTyped from './hooks/useTyped';
import useStyle from './style';

export interface StepOption {
  /**
   * @since 5.17.0
   * @default 1
   */
  step: number;
  /**
   * @since 5.17.0
   * @default 100
   */
  interval: number;
}

export interface ChatBoxProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  avatar?: React.ReactNode;
  placement?: 'start' | 'end';
  loading?: React.ReactNode;
  step?: boolean | StepOption;
  content?: string;
  contentRender?: (content?: string) => React.ReactNode;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    avatar,
    placement = 'start',
    step,
    content,
    contentRender,
  } = props;
  const { direction, getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('chatbox', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedStep = useMergedStep(step);

  const { typedContent, showCursor } = useTyped(content, mergedStep);

  const streamContent = React.useMemo<React.ReactNode>(
    () => (
      <>
        {typedContent}
        {showCursor && <span className={`${prefixCls}-content-typedCursor`} />}
      </>
    ),
    [typedContent, showCursor],
  );

  const mergedCls = classNames(
    className,
    rootClassName,
    prefixCls,
    hashId,
    cssVarCls,
    `${prefixCls}-${placement}`,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  return wrapCSSVar(
    <div style={style} className={mergedCls}>
      {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
      {contentRender ? (
        contentRender(content)
      ) : (
        <div className={`${prefixCls}-content`}>
          {mergedStep !== false ? streamContent : content}
        </div>
      )}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ChatBox.displayName = 'ChatBox';
}

export default ChatBox;
