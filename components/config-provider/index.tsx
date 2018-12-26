import * as React from 'react';
import createReactContext, { Context } from 'create-react-context';

import defaultRenderEmpty, { RenderEmptyHandler } from './renderEmpty';

export { RenderEmptyHandler };

export interface ConfigConsumerProps {
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  renderEmpty: RenderEmptyHandler;
}

interface ConfigProviderProps {
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
}

const ConfigContext: Context<ConfigConsumerProps | null> = createReactContext({
  // We provide a default function for Context without provider
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return `ant-${suffixCls}`;
  },

  renderEmpty: defaultRenderEmpty,
});

export const ConfigConsumer = ConfigContext.Consumer;

class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'ant' } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };

  renderProvider = (context: ConfigConsumerProps) => {
    const { children, getPopupContainer, renderEmpty } = this.props;

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixCls,
    };

    if (getPopupContainer) {
      config.getPopupContainer = getPopupContainer;
    }
    if (renderEmpty) {
      config.renderEmpty = renderEmpty;
    }

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
  };

  render() {
    return <ConfigConsumer>{this.renderProvider}</ConfigConsumer>;
  }
}

export default ConfigProvider;
