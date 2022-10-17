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

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = (
  { afterClose, config },
  ref,
) => {
  const [open, setOpen] = React.useState(true);
  const [innerConfig, setInnerConfig] = React.useState(config);
  const { direction, getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();

  const close = (...args: any[]) => {
    setOpen(false);
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel(() => {}, ...args.slice(1));
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
      {contextLocale => (
        <ConfirmDialog
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          {...innerConfig}
          close={close}
          open={open}
          afterClose={afterClose}
          okText={
            innerConfig.okText ||
            (innerConfig.okCancel ? contextLocale.okText : contextLocale.justOkText)
          }
          direction={direction}
          cancelText={innerConfig.cancelText || contextLocale.cancelText}
        />
      )}
    </LocaleReceiver>
  );
};

export default React.forwardRef(HookModal);
