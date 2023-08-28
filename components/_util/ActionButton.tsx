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

function isThenable(thing?: PromiseLike<any>): boolean {
  return !!(thing && !!thing.then);
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const clickedRef = React.useRef<boolean>(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<ButtonProps['loading']>(false);
  const { close } = props;
  const onInternalClose = (...args: any[]) => {
    close?.(...args);
  };

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (props.autoFocus) {
      timeoutId = setTimeout(() => {
        ref.current?.focus();
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

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { actionFn } = props;
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    let returnValueOfOnOk;
    if (props.emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
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

  const { type, children, prefixCls, buttonProps } = props;
  return (
    <Button
      {...convertLegacyProps(type)}
      onClick={onClick}
      loading={loading}
      prefixCls={prefixCls}
      {...buttonProps}
      ref={ref}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
