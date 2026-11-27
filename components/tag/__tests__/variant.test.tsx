import React from 'react';

import Tag from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ConfigProviderProps } from '../../config-provider';
import Form from '../../form';

describe('Tag global variant', () => {
  it.each<[ConfigProviderProps['variant'], string]>([
    [undefined, 'filled'],
    ['outlined', 'outlined'],
    ['filled', 'filled'],
    ['borderless', 'filled'],
    ['underlined', 'filled'],
  ])('resolves global variant %s to %s', (variant, expected) => {
    const { container } = render(
      <ConfigProvider variant={variant}>
        <Tag>Tag</Tag>
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass(`ant-tag-${expected}`);
  });

  it.each(['filled', 'solid', 'outlined'] as const)(
    'keeps component variant %s above the global variant',
    (variant) => {
      const { container } = render(
        <ConfigProvider variant="outlined" tag={{ variant }}>
          <Tag>Tag</Tag>
        </ConfigProvider>,
      );
      expect(container.firstChild).toHaveClass(`ant-tag-${variant}`);
    },
  );

  it('preserves local props and legacy color and bordered priority', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <ConfigProvider variant="outlined" tag={{ variant: 'outlined' }}>
        <Tag variant="filled">Local</Tag>
        <Tag color="green-inverse">Inverse</Tag>
        <Tag bordered={false}>Bordered</Tag>
      </ConfigProvider>,
    );
    const tags = container.querySelectorAll('.ant-tag');
    expect(tags[0]).toHaveClass('ant-tag-filled');
    expect(tags[1]).toHaveClass('ant-tag-solid', 'ant-tag-green');
    expect(tags[2]).toHaveClass('ant-tag-filled');
    errorSpy.mockRestore();
  });

  it('updates inherited variant and semantic props through nested providers', () => {
    const Demo = ({ variant }: Pick<ConfigProviderProps, 'variant'>) => (
      <ConfigProvider variant="filled">
        <ConfigProvider variant={variant}>
          <Tag classNames={({ props }) => ({ root: `semantic-${props.variant}` })}>Tag</Tag>
        </ConfigProvider>
      </ConfigProvider>
    );
    const { container, rerender } = render(<Demo variant="outlined" />);
    expect(container.firstChild).toHaveClass('ant-tag-outlined', 'semantic-outlined');

    rerender(<Demo variant="filled" />);
    expect(container.firstChild).toHaveClass('ant-tag-filled', 'semantic-filled');
    expect(container.firstChild).not.toHaveClass('ant-tag-outlined');
  });

  it('uses Form variant before component configuration and keeps local props first', () => {
    const { container } = render(
      <ConfigProvider variant="outlined" tag={{ variant: 'outlined' }}>
        <Form variant="filled">
          <Tag>Form</Tag>
          <Tag variant="solid">Local</Tag>
        </Form>
      </ConfigProvider>,
    );
    const tags = container.querySelectorAll('.ant-tag');
    expect(tags[0]).toHaveClass('ant-tag-filled');
    expect(tags[1]).toHaveClass('ant-tag-solid');
  });
});
