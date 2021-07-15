import * as React from 'react';
import Button from '../button';
import { LegacyButtonType, ButtonProps, convertLegacyProps } from '../button/button';

export interface ActionButtonProps {
  type?: LegacyButtonType;
  actionFn?: (...args: any[]) => any | PromiseLike<any>;
  closeModal: Function;
  autoFocus?: boolean;
  prefixCls: string;
  buttonProps?: ButtonProps;
}

const ActionButton: React.FC<ActionButtonProps> = props => {
  const clickedRef = React.useRef<boolean>(false);
  const ref = React.useRef<any>();
  const [loading, setLoading] = React.useState<ButtonProps['loading']>(false);

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
    const { closeModal } = props;
    if (!returnValueOfOnOk || !returnValueOfOnOk.then) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk.then(
      (...args: any[]) => {
        // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
        // setState({ loading: false });
        closeModal(...args);
      },
      (e: Error) => {
        // Emit error when catch promise reject
        // eslint-disable-next-line no-console
        console.error(e);
        // See: https://github.com/ant-design/ant-design/issues/6183
        setLoading(false);
        clickedRef.current = false;
      },
    );
  };

  const onClick = () => {
    const { actionFn, closeModal } = props;
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      closeModal();
      return;
    }
    let returnValueOfOnOk;
    if (actionFn.length) {
      returnValueOfOnOk = actionFn(closeModal);
      // https://github.com/ant-design/ant-design/issues/23358
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        closeModal();
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
