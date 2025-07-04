import React, { useEffect } from 'react';

import { Modal } from '../..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import zhCN from '../zh_CN';

const Demo: React.FC<{ type: string }> = ({ type }) => {
  useEffect(() => {
    if (type === 'dashboard') {
      Modal.confirm({ title: 'Hello World!' });
    }
  }, []);
  return null;
};

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Locale Provider demo', () => {
  it('change type', async () => {
    jest.useFakeTimers();

    const BasicExample: React.FC = () => {
      const [type, setType] = React.useState<string>('');
      return (
        <div>
          <a className="about" onClick={() => setType('about')}>
            about
          </a>
          <a className="dashboard" onClick={() => setType('dashboard')}>
            dashboard
          </a>
          <div>
            {type === 'about' && (
              <ConfigProvider locale={zhCN}>
                <Demo type="about" />
              </ConfigProvider>
            )}
            {type === 'dashboard' && (
              <ConfigProvider locale={zhCN}>
                <Demo type="dashboard" />
              </ConfigProvider>
            )}
          </div>
        </div>
      );
    };
    const { container } = render(<BasicExample />);

    fireEvent.click(container.querySelector('.about')!);
    await waitFakeTimer();

    fireEvent.click(container.querySelector('.dashboard')!);
    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-btn-primary span')[0]?.textContent).toBe('确 定');
    Modal.destroyAll();
    jest.useRealTimers();
  }, 500000);
});
