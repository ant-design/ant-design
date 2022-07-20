import * as React from 'react';
import { ConfigContext } from '../../config-provider';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import defaultLocale from '../../locale/default';
import ConfirmDialog from '../ConfirmDialog';
import type { ModalFuncProps } from '../Modal';

export interface HookModalProps {
  afterClose: () => void;
  config: ModalFuncProps;
}

export interface HookModalRef {
  destroy: () => void;
  update: (config: ModalFuncProps) => void;
}

interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = (
  { afterClose, config },
  ref,
) => {
  const [visible, setVisible] = React.useState(true);
  const [innerConfig, setInnerConfig] = React.useState(config);
  const { direction, getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();

  const close = (...args: any[]) => {
    setVisible(false);
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel();
    }
  };

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig(originConfig => ({
        ...originConfig,
        ...newConfig,
      }));
    },
  }));

  return (
    <LocaleReceiver componentName="Modal" defaultLocale={defaultLocale.Modal}>
      {(modalLocale: ModalLocale) => (
        <ConfirmDialog
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          {...innerConfig}
          close={close}
          visible={visible}
          afterClose={afterClose}
          okText={
            innerConfig.okText ||
            (innerConfig.okCancel ? modalLocale.okText : modalLocale.justOkText)
          }
          direction={direction}
          cancelText={innerConfig.cancelText || modalLocale.cancelText}
        />
      )}
    </LocaleReceiver>
  );
};

export default React.forwardRef(HookModal);
