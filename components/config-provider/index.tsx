import * as React from 'react';
import createReactContext from '@ant-design/create-react-context';

import defaultRenderEmpty, { RenderEmptyHandler } from './renderEmpty';

export { RenderEmptyHandler };

export interface CSPConfig {
  nonce?: string;
}

export interface ConfigConsumerProps {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  renderEmpty: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
}

export const configConsumerProps = [
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
];

export interface ConfigProviderProps {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
}

const ConfigContext = createReactContext<ConfigConsumerProps>({
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
    const { children, getPopupContainer, renderEmpty, csp, autoInsertSpaceInButton } = this.props;

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixCls,
      csp,
      autoInsertSpaceInButton,
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

// =========================== withConfigConsumer ===========================
// We need define many types here. So let's put in the block region
type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

interface BasicExportProps {
  prefixCls?: string;
}

interface ConsumerConfig {
  prefixCls: string;
}

interface ConstructorProps {
  displayName?: string;
}

export function withConfigConsumer<ExportProps extends BasicExportProps>(config: ConsumerConfig) {
  return function<ComponentDef>(Component: IReactComponent): React.SFC<ExportProps> & ComponentDef {
    // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
    const SFC = ((props: ExportProps) => (
      <ConfigConsumer>
        {(configProps: ConfigConsumerProps) => {
          const { prefixCls: basicPrefixCls } = config;
          const { getPrefixCls } = configProps;
          const { prefixCls: customizePrefixCls } = props;
          const prefixCls = getPrefixCls(basicPrefixCls, customizePrefixCls);
          return <Component {...configProps} {...props} prefixCls={prefixCls} />;
        }}
      </ConfigConsumer>
    )) as React.SFC<ExportProps> & ComponentDef;

    const cons: ConstructorProps = Component.constructor as ConstructorProps;
    const name = (cons && cons.displayName) || Component.name || 'Component';

    SFC.displayName = `withConfigConsumer(${name})`;

    return SFC;
  };
}

export default ConfigProvider;
