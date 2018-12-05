import * as React from 'react';
import createReactContext, { Context } from 'create-react-context';

export interface ConfigConsumerProps {
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

interface ConfigProviderProps {
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
}

const ConfigContext: Context<ConfigConsumerProps | null> = createReactContext({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return `ant-${suffixCls}`;
  },
});

export const ConfigConsumer = ConfigContext.Consumer;

class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'ant' } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };

  renderProvider = (context: ConfigConsumerProps) => {
    const { getPopupContainer, children } = this.props;

    const config: ConfigConsumerProps = {
      ...context,
      getPopupContainer,
      getPrefixCls: this.getPrefixCls,
    };

    return (
      <ConfigContext.Provider value={config}>
        {children}
      </ConfigContext.Provider>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderProvider}
      </ConfigConsumer>
    );
  }
}

 export default ConfigProvider;
