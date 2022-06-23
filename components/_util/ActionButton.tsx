import useState from 'rc-util/lib/hooks/useState';
import * as React from 'react';
import Button from '../button';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { convertLegacyProps } from '../button/button';

export interface ActionButtonProps {
  type?: LegacyButtonType;
  actionFn?: (...args: any[]) => any | PromiseLike<any>;
  close: Function;
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

const ActionButton: React.FC<ActionButtonProps> = props => {
  const clickedRef = React.useRef<boolean>(false);
  const ref = React.useRef<any>();
  const [loading, setLoading] = useState<ButtonProps['loading']>(false);

  React.useEffect(() => {
    let timeoutId: any;
    if (props.autoFocus) {
      const $this = ref.current as HTMLInputElement;
      timeoutId = setTimeout(() => $this.focus());
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handlePromiseOnOk = (returnValueOfOnOk?: PromiseLike<any>) => {
    const { close } = props;
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk!.then(
      (...args: any[]) => {
        setLoading(false, true);
        close(...args);
        clickedRef.current = false;
      },
      (e: Error) => {
        // Emit error when catch promise reject
        // eslint-disable-next-line no-console
        console.error(e);
        // See: https://github.com/ant-design/ant-design/issues/6183
        setLoading(false, true);
        clickedRef.current = false;
      },
    );
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { actionFn, close } = props;
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      close();
      return;
    }
    let returnValueOfOnOk;
    if (props.emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        close(e);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      // https://github.com/ant-design/ant-design/issues/23358
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        close();
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
