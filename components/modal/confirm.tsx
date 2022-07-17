import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import { render as reactRender, unmount as reactUnmount } from 'rc-util/lib/React/render';
import * as React from 'react';
import { globalConfig } from '../config-provider';
import warning from '../_util/warning';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import { getConfirmLocale } from './locale';
import type { ModalFuncProps } from './Modal';

let defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>;

export default function confirm(config: ModalFuncProps) {
  const container = document.createDocumentFragment();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = { ...config, close, visible: true } as any;

  function destroy(...args: any[]) {
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

    reactUnmount(container);
  }

  function render({ okText, cancelText, prefixCls: customizePrefixCls, ...props }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      const runtimeLocale = getConfirmLocale();
      const { getPrefixCls, getIconPrefixCls } = globalConfig();
      // because Modal.config  set rootPrefixCls, which is different from other components
      const rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
      const iconPrefixCls = getIconPrefixCls();

      reactRender(
        <ConfirmDialog
          {...props}
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          iconPrefixCls={iconPrefixCls}
          okText={okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText)}
          cancelText={cancelText || runtimeLocale.cancelText}
        />,
        container,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }

        destroy.apply(this, args);
      },
    };
    render(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
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
    icon: <ExclamationCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <InfoCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <CheckCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <CloseCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <ExclamationCircleOutlined />,
    okCancel: true,
    ...props,
    type: 'confirm',
  };
}

export function modalGlobalConfig({ rootPrefixCls }: { rootPrefixCls: string }) {
  warning(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.');
  defaultRootPrefixCls = rootPrefixCls;
}
