import React, { useContext } from 'react';

import warning from '../_util/warning';
import ConfigProvider, { ConfigContext, globalConfig, warnContext } from '../config-provider';
import { getReactRender, UnmountType } from '../config-provider/UnstableContext';
import type { ConfirmDialogProps } from './ConfirmDialog';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import type { ModalFuncProps } from './interface';
import { getConfirmLocale } from './locale';

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

const ConfirmDialogWrapper: React.FC<ConfirmDialogProps> = (props) => {
  const { prefixCls: customizePrefixCls, getContainer, direction } = props;
  const runtimeLocale = getConfirmLocale();

  const config = useContext(ConfigContext);
  const rootPrefixCls = getRootPrefixCls() || config.getPrefixCls();
  // because Modal.config set rootPrefixCls, which is different from other components
  const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;

  let mergedGetContainer = getContainer;
  if (mergedGetContainer === false) {
    mergedGetContainer = undefined;

    if (process.env.NODE_ENV !== 'production') {
      warning(
        false,
        'Modal',
        'Static method not support `getContainer` to be `false` since it do not have context env.',
      );
    }
  }

  return (
    <ConfirmDialog
      {...props}
      rootPrefixCls={rootPrefixCls}
      prefixCls={prefixCls}
      iconPrefixCls={config.iconPrefixCls}
      theme={config.theme}
      direction={direction ?? config.direction}
      locale={config.locale?.Modal ?? runtimeLocale}
      getContainer={mergedGetContainer}
    />
  );
};

export default function confirm(config: ModalFuncProps) {
  const global = globalConfig();

  if (process.env.NODE_ENV !== 'production' && !global.holderRender) {
    warnContext('Modal');
  }

  const container = document.createDocumentFragment();
  let currentConfig = { ...config, close, open: true } as any;
  let timeoutId: ReturnType<typeof setTimeout>;

  let reactUnmount: UnmountType;

  function destroy(...args: any[]) {
    const triggerCancel = args.some((param) => param?.triggerCancel);
    if (triggerCancel) {
      config.onCancel?.(() => {}, ...args.slice(1));
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }

    reactUnmount();
  }

  function render(props: any) {
    clearTimeout(timeoutId);

    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    timeoutId = setTimeout(() => {
      const rootPrefixCls = global.getPrefixCls(undefined, getRootPrefixCls());
      const iconPrefixCls = global.getIconPrefixCls();
      const theme = global.getTheme();

      const dom = <ConfirmDialogWrapper {...props} />;

      const reactRender = getReactRender();

      reactUnmount = reactRender(
        <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={iconPrefixCls} theme={theme}>
          {global.holderRender ? global.holderRender(dom) : dom}
        </ConfigProvider>,
        container,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }
        // @ts-ignore
        destroy.apply(this, args);
      },
    };

    // Legacy support
    if (currentConfig.visible) {
      delete currentConfig.visible;
    }

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
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
  };
}

export function modalGlobalConfig({ rootPrefixCls }: { rootPrefixCls: string }) {
  warning(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.');
  defaultRootPrefixCls = rootPrefixCls;
}
