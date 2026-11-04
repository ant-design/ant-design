import React from 'react';

import Alert from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ConfigProviderProps } from '../../config-provider';
import Form from '../../form';

describe('Alert global variant', () => {
  it.each<[ConfigProviderProps['variant'], string]>([
    [undefined, 'outlined'],
    ['outlined', 'outlined'],
    ['filled', 'filled'],
    ['borderless', 'outlined'],
    ['underlined', 'outlined'],
  ])('resolves global variant %s to %s', (variant, expected) => {
    const { container } = render(
      <ConfigProvider variant={variant}>
        <Alert title="Info" />
      </ConfigProvider>,
    );

    expect(container.firstChild).toHaveClass(`ant-alert-${expected}`);
  });

  it('preserves component configuration and local prop priority', () => {
    const { container, rerender } = render(
      <ConfigProvider variant="filled" alert={{ variant: 'outlined' }}>
        <Alert title="Info" />
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass('ant-alert-outlined');

    rerender(
      <ConfigProvider variant="filled" alert={{ variant: 'outlined' }}>
        <Alert title="Info" variant="filled" />
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass('ant-alert-filled');
  });

  it('updates global variant through nested providers and semantic props', () => {
    const Demo = ({ variant }: Pick<ConfigProviderProps, 'variant'>) => (
      <ConfigProvider variant="outlined">
        <ConfigProvider variant={variant}>
          <Alert title="Info" classNames={({ props }) => ({ root: `semantic-${props.variant}` })} />
        </ConfigProvider>
      </ConfigProvider>
    );
    const { container, rerender } = render(<Demo variant="filled" />);
    expect(container.firstChild).toHaveClass('ant-alert-filled', 'semantic-filled');

    rerender(<Demo variant="outlined" />);
    expect(container.firstChild).toHaveClass('ant-alert-outlined', 'semantic-outlined');
    expect(container.firstChild).not.toHaveClass('ant-alert-filled');
  });

  it('uses Form variant before component configuration and keeps local props first', () => {
    const { container } = render(
      <ConfigProvider variant="filled" alert={{ variant: 'filled' }}>
        <Form variant="outlined">
          <Alert title="Info" />
          <Alert title="Info" variant="filled" />
        </Form>
      </ConfigProvider>,
    );
    const alerts = container.querySelectorAll('.ant-alert');
    expect(alerts[0]).toHaveClass('ant-alert-outlined');
    expect(alerts[1]).toHaveClass('ant-alert-filled');
  });
});
