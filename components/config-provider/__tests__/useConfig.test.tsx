import React from 'react';

import ConfigProvider from '..';
import { resetWarned } from '../../_util/warning';
import { render } from '../../../tests/utils';
import Button from '../../button';
import Form from '../../form';
import Space from '../../space';

describe('ConfigProvider.useConfig', () => {
  it('reads the Space.Compact size inside the group and the ConfigProvider size outside', () => {
    const CustomControl: React.FC<{ label: string }> = ({ label }) => {
      const { componentSize } = ConfigProvider.useConfig();
      return <output aria-label={label}>{componentSize}</output>;
    };

    const { getByLabelText } = render(
      <ConfigProvider componentSize="large">
        <Space.Compact size="small">
          <CustomControl label="Inside group" />
        </Space.Compact>
        <CustomControl label="Outside group" />
      </ConfigProvider>,
    );

    expect(getByLabelText('Inside group')).toHaveTextContent('small');
    expect(getByLabelText('Outside group')).toHaveTextContent('large');
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
