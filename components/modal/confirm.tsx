import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ModalFuncProps, destroyFns } from './Modal';
import ConfirmDialog from './ConfirmDialog';

export interface ConfirmReturn {
  destroy: () => void;
  update: (config: ModalFuncProps) => void;
}

export default function confirm(config: ModalFuncProps): ConfirmReturn {
  const div = document.createElement('div');
  document.body.appendChild(div);
  // eslint-disable-next-line no-use-before-define
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
      // eslint-disable-next-line no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props: any) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
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
