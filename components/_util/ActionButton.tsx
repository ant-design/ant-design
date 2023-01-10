import useState from 'rc-util/lib/hooks/useState';
import * as React from 'react';
import Button from '../button';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { convertLegacyProps } from '../button/button';

export interface ActionButtonProps {
  type?: LegacyButtonType;
  actionFn?: (...args: any[]) => any | PromiseLike<any>;
  close?: Function;
  autoFocus?: boolean;
  prefixCls: string;
  buttonProps?: ButtonProps;
  emitEvent?: boolean;
  quitOnNullishReturnValue?: boolean;
  children?: React.ReactNode;
}

function isThenable<T extends any>(thing?: PromiseLike<T>): boolean {
  return !!(thing && thing.then);
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    type,
    children,
    prefixCls,
    buttonProps,
    close,
    autoFocus,
    emitEvent,
    quitOnNullishReturnValue,
    actionFn,
  } = props;

  const clickedRef = React.useRef<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [loading, setLoading] = useState<ButtonProps['loading']>(false);

  const onInternalClose = (...args: any[]) => {
    close?.(...args);
  };

  React.useEffect(() => {
    let timeoutId: NodeJS.Timer | null = null;
    if (autoFocus) {
      timeoutId = setTimeout(() => {
        buttonRef.current?.focus();
      });
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handlePromiseOnOk = (returnValueOfOnOk?: PromiseLike<any>) => {
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk!.then(
      (...args: any[]) => {
        setLoading(false, true);
        onInternalClose(...args);
        clickedRef.current = false;
      },
      (e: Error) => {
        // See: https://github.com/ant-design/ant-design/issues/6183
        setLoading(false, true);
        clickedRef.current = false;
        return Promise.reject(e);
      },
    );
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    let returnValueOfOnOk: PromiseLike<any>;
    if (emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        onInternalClose(e);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      // https://github.com/ant-design/ant-design/issues/23358
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        onInternalClose();
        return;
      }
    }
    handlePromiseOnOk(returnValueOfOnOk);
  };

  return (
    <Button
      {...convertLegacyProps(type)}
      onClick={onClick}
      loading={loading}
      prefixCls={prefixCls}
      {...buttonProps}
      ref={buttonRef}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
