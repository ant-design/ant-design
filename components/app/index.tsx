import type { AppProps } from './App';
import App_ from './App';
import useApp from './useApp';

export type { AppProps };

type CompoundedComponent = typeof App_ & {
  useApp: typeof useApp;
};

const App = App_ as CompoundedComponent;

App.useApp = useApp;

export default App;
