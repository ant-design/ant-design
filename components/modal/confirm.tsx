import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { getConfirmLocale } from './locale';
import { ModalFuncProps, destroyFns } from './Modal';
import ConfirmDialog from './ConfirmDialog';

let defaultRootPrefixCls = 'ant';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

export type ModalFunc = (
  props: ModalFuncProps,
) => {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
};

export interface ModalStaticFunctions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
  confirm: ModalFunc;
}

export default function confirm(config: ModalFuncProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = { ...config, close, visible: true } as any;

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render({ okText, cancelText, prefixCls, ...props }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      const runtimeLocale = getConfirmLocale();
      ReactDOM.render(
        <ConfirmDialog
          {...props}
          prefixCls={prefixCls || `${getRootPrefixCls()}-modal`}
          rootPrefixCls={getRootPrefixCls()}
          okText={okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText)}
          cancelText={cancelText || runtimeLocale.cancelText}
        />,
        div,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        destroy.bind(this, ...args)();
      },
    };
    render(currentConfig);
  }

  function update(newConfig: ModalFuncProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    type: 'warning',
    icon: <ExclamationCircleOutlined />,
    okCancel: false,
    ...props,
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    type: 'info',
    icon: <InfoCircleOutlined />,
    okCancel: false,
    ...props,
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    type: 'success',
    icon: <CheckCircleOutlined />,
    okCancel: false,
    ...props,
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    type: 'error',
    icon: <CloseCircleOutlined />,
    okCancel: false,
    ...props,
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    type: 'confirm',
    icon: <ExclamationCircleOutlined />,
    okCancel: true,
    ...props,
  };
}

export function globalConfig({ rootPrefixCls }: { rootPrefixCls?: string }) {
  if (rootPrefixCls) {
    defaultRootPrefixCls = rootPrefixCls;
  }
}
