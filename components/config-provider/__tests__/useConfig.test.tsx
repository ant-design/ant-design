import React from 'react';
import { Button } from 'antd';

import ConfigProvider from '..';
import { resetWarned } from '../../_util/warning';
import { render } from '../../../tests/utils';
import Form from '../../form';

describe('ConfigProvider.useConfig', () => {
  it('useConfig - componentSize', () => {
    let size;

    const App: React.FC = () => {
      const { componentSize } = ConfigProvider.useConfig();
      size = componentSize;

      return null;
    };

    render(
      <ConfigProvider componentSize="small">
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

  it('deprecated SizeContext', () => {
    resetWarned();

    const App: React.FC = () => {
      const { SizeContext } = ConfigProvider;
      const ctx = React.useContext(SizeContext);

      return <div>{ctx}</div>;
    };

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<App />);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: ConfigProvider] ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead.',
    );
    errSpy.mockRestore();
  });

  it('deprecated autoInsertSpaceInButton', () => {
    resetWarned();
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button>测试</Button>
      </ConfigProvider>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: ConfigProvider] `autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.',
    );
    errSpy.mockRestore();
  });
});
