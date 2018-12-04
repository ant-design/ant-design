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

class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'ant' } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return `${prefixCls}-${suffixCls}`;
  };

  render() {
    const { getPopupContainer, children } = this.props;

    const config: ConfigConsumerProps = {
      getPopupContainer,
      getPrefixCls: this.getPrefixCls,
    };

    return (
      <ConfigContext.Provider value={config}>
        {children}
      </ConfigContext.Provider>
    );
  }
}

 export const ConfigConsumer = ConfigContext.Consumer;

 export default ConfigProvider;
