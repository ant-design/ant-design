import React, { useContext } from 'react';
import { render, unmount } from '@rc-component/util';

import { isFunction } from '../_util/is';
import warning from '../_util/warning';
import ConfigProvider, { ConfigContext, globalConfig, warnContext } from '../config-provider';
import type { ConfirmDialogProps } from './ConfirmDialog';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import type { ModalFuncProps } from './interface';
import { getConfirmLocale } from './locale';

let defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

export type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warning: ModalFunc;
  confirm: ModalFunc;
  /** @deprecated Please use `warning` instead */
  warn: ModalFunc;
};

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
  // Arguments of the last `close` call. The modal is destroyed after closing only when set.
  let closeArgs: any[] | undefined;

  function destroy(...args: any[]) {
    const triggerCancel = args.some((param) => param?.triggerCancel);
    if (triggerCancel) {
      currentConfig.onCancel?.(() => {}, ...args.slice(1));
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }

    unmount(container).then(() => {
      // Do nothing
    });
  }

  // Kept out of `currentConfig` so that `update` can still replace the user's `afterClose`
  function afterClose() {
    if (isFunction(currentConfig.afterClose)) {
      currentConfig.afterClose();
    }
    if (closeArgs) {
      destroy(...closeArgs);
    }
  }

  const scheduleRender = (props: ConfirmDialogProps) => {
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

      const dom = <ConfirmDialogWrapper {...props} afterClose={afterClose} />;

      render(
        <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={iconPrefixCls} theme={theme}>
          {isFunction(global.holderRender) ? global.holderRender(dom) : dom}
        </ConfigProvider>,
        container,
      );
    });
  };

  function close(...args: any[]) {
    closeArgs = args;
    currentConfig = { ...currentConfig, open: false };

    scheduleRender(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (isFunction(configUpdate)) {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = { ...currentConfig, ...configUpdate };
    }
    scheduleRender(currentConfig);
  }

  scheduleRender(currentConfig);

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
