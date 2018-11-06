import * as React from 'react';
import createReactContext, { Context } from 'create-react-context';

export interface ConfigProviderProps {
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
}

const ConfigContext: Context<ConfigProviderProps | null> = createReactContext({});

const ConfigProvider: React.SFC<ConfigProviderProps> = (props) => {
  const { getPopupContainer, children } = props;
  const config = {
    getPopupContainer,
  };

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
 }

 export const ConfigConsumer = ConfigContext.Consumer;

 export default ConfigProvider;
