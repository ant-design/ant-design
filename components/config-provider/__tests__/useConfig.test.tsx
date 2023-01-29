import React from 'react';
import ConfigProvider from '..';
import Form from '../../form';
import { render } from '../../../tests/utils';

describe('ConfigProvider.useConfig', () => {
  it('useConfig - componentSize', () => {
    let size;

    const App: React.FC = () => {
      const { componentSize } = ConfigProvider.useConfig();
      size = componentSize;

      return null;
    };

    render(
      <ConfigProvider componentSize='small'>
        <App />
      </ConfigProvider>,
    );

    expect(size).toBe('small');
  });

  it('useConfig - componentDisabled', () => {
    let disabled;
    const App: React.FC = () => {
      const { componentDisabled } = ConfigProvider.useConfig();
      disabled = componentDisabled;
      return null;
    };

    render(
      <Form disabled>
        <App />
      </Form>,
    );

    expect(disabled).toBe(true);
  });
});
