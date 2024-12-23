import * as ReactDOM from 'react-dom';
import { Modal, unstableSetRender } from 'antd';

import { waitFakeTimer19 } from '../../tests/utils';

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('unstable', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('unstableSetRender', async () => {
    if (ReactDOM.version.startsWith('19')) {
      unstableSetRender((node, container) => {
        const root = (ReactDOM as any).createRoot(container);
        root.render(node);
        return async () => {
          root.unmount();
        };
      });

      Modal.info({ content: 'unstableSetRender' });

      await waitFakeTimer19();

      expect(document.querySelector('.ant-modal')).toBeTruthy();
    }
  });
});
