import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import useStyle from './style';

interface StepOption {
  step: number;
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

const defaultStep: StepOption = {
  step: 1,
  interval: 100,
};

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    avatar,
    content,
    placement = 'start',
    step = true,
  } = props;
  const { direction, getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('chatbox', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const [typedContent, setTypedContent] = React.useState<string>('');
  const [showCursor, setShowCursor] = React.useState<boolean>(false);

  const timerRef = React.useRef<ReturnType<typeof setInterval>>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const mergedStep = React.useMemo<StepOption | false>(() => {
    if (step && typeof step === 'object') {
      return { ...defaultStep, ...step };
    }
    if (step === true) {
      return defaultStep;
    }
    return step;
  }, [step]);

  React.useEffect(() => {
    if (!content) {
      return;
    }
    if (mergedStep) {
      setShowCursor(true);
      let stepCount = 0;
      const { step: totalStep, interval } = mergedStep;
      timerRef.current = setInterval(() => {
        stepCount += totalStep;
        setTypedContent(content.slice(0, stepCount) ?? '');
        if (stepCount >= content.length) {
          clearTimer();
          setShowCursor(false);
        }
      }, interval);
      return () => {
        clearTimer();
        setShowCursor(false);
      };
    }
  }, [content, mergedStep]);

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
      <div className={`${prefixCls}-content`}>
        {mergedStep ? typedContent : content}
        {showCursor && <span className={`${prefixCls}-content-typedCursor`}>|</span>}
      </div>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ChatBox.displayName = 'ChatBox';
}

export default ChatBox;
