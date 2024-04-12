import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import useStyle from './style';
import useTyped from './useTyped';

export interface StepOption {
  step: number;
  interval: number;
}

const defaultStep: StepOption = {
  step: 1,
  interval: 100,
};

export interface ChatBoxProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  avatar?: React.ReactNode;
  placement?: 'start' | 'end';
  loading?: React.ReactNode;
  step?: boolean | StepOption;
  content: string;
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

  const mergedStep = React.useMemo<StepOption | false>(() => {
    if (step && typeof step === 'object') {
      return { ...defaultStep, ...step };
    }
    if (step === true) {
      return defaultStep;
    }
    return false;
  }, [step]);

  const { typedContent, showCursor } = useTyped(content, mergedStep);

  const mergedCls = classNames(
    className,
    rootClassName,
    prefixCls,
    hashId,
    cssVarCls,
    `${prefixCls}-${placement}`,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  const streamContent = (
    <>
      {typedContent}
      {showCursor && <span className={`${prefixCls}-content-typedCursor`} />}
    </>
  );

  return wrapCSSVar(
    <div style={style} className={mergedCls}>
      {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
      {contentRender ? (
        contentRender(content)
      ) : (
        <div className={`${prefixCls}-content`}>{mergedStep ? streamContent : content}</div>
      )}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ChatBox.displayName = 'ChatBox';
}

export default ChatBox;
