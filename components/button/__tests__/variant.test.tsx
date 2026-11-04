import React from 'react';

import Button, { _ButtonVariantTypes } from '..';
import type { ButtonProps } from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ConfigProviderProps } from '../../config-provider';
import Form from '../../form';

describe('Button global variant', () => {
  it.each<[ConfigProviderProps['variant'], string]>([
    [undefined, 'outlined'],
    ['outlined', 'outlined'],
    ['filled', 'filled'],
    ['borderless', 'outlined'],
    ['underlined', 'outlined'],
  ])('resolves global variant %s to %s', (variant, expected) => {
    const { container } = render(
      <ConfigProvider variant={variant}>
        <Button>Button</Button>
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass(
      `ant-btn-variant-${expected}`,
      'ant-btn-color-default',
    );
  });

  it.each(_ButtonVariantTypes)(
    'preserves component variant %s and its configured color',
    (variant) => {
      const { container } = render(
        <ConfigProvider variant="filled" button={{ variant, color: 'blue' }}>
          <Button>Button</Button>
        </ConfigProvider>,
      );
      expect(container.firstChild).toHaveClass(`ant-btn-variant-${variant}`, 'ant-btn-color-blue');
    },
  );

  it.each(_ButtonVariantTypes)('keeps local color and variant %s first', (variant) => {
    const { container } = render(
      <ConfigProvider variant="filled" button={{ variant: 'solid', color: 'red' }}>
        <Button color="green" variant={variant} type="primary" danger>
          Button
        </Button>
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass(`ant-btn-variant-${variant}`, 'ant-btn-color-green');
  });

  it.each(_ButtonVariantTypes)(
    'keeps local variant %s first without an explicit color',
    (variant) => {
      const { container } = render(
        <ConfigProvider variant="filled">
          <Button variant={variant}>Global</Button>
          <ConfigProvider button={{ variant: 'filled', color: 'blue' }}>
            <Button variant={variant}>Component</Button>
            <Form variant="filled">
              <Button variant={variant}>Form</Button>
            </Form>
          </ConfigProvider>
        </ConfigProvider>,
      );

      const buttons = container.querySelectorAll('.ant-btn');
      expect(buttons).toHaveLength(3);
      buttons.forEach((button) => {
        expect(button).toHaveClass(`ant-btn-variant-${variant}`);
      });
    },
  );

  it.each<[ButtonProps, string, string]>([
    [{ type: 'default' }, 'outlined', 'default'],
    [{ type: 'primary' }, 'solid', 'primary'],
    [{ type: 'dashed' }, 'dashed', 'default'],
    [{ type: 'text' }, 'text', 'default'],
    [{ type: 'link' }, 'link', 'link'],
    [{ danger: true }, 'outlined', 'dangerous'],
    [{ type: 'primary', danger: true }, 'solid', 'dangerous'],
    [{ type: 'primary', variant: 'outlined' }, 'solid', 'primary'],
    [{ type: 'dashed', variant: 'filled' }, 'dashed', 'default'],
    [{ danger: true, variant: 'filled' }, 'outlined', 'dangerous'],
  ])('preserves the type and danger priority for %j', (props, variant, color) => {
    const { container } = render(
      <ConfigProvider variant="filled" button={{ variant: 'dashed', color: 'blue' }}>
        <Button {...props}>Button</Button>
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass(
      `ant-btn-variant-${variant}`,
      `ant-btn-color-${color}`,
    );
  });

  it('preserves the default color when only button.color is configured', () => {
    const { container, rerender } = render(
      <ConfigProvider button={{ color: 'blue' }}>
        <Button>Button</Button>
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass('ant-btn-variant-outlined', 'ant-btn-color-default');

    rerender(
      <ConfigProvider variant="filled" button={{ color: 'blue' }}>
        <Button>Button</Button>
      </ConfigProvider>,
    );
    expect(container.firstChild).toHaveClass('ant-btn-variant-filled', 'ant-btn-color-blue');
  });

  it('preserves the solid default color and ghost behavior', () => {
    const { container } = render(
      <ConfigProvider variant="filled">
        <Button variant="solid">Local</Button>
        <Button variant="solid" ghost>
          Ghost
        </Button>
      </ConfigProvider>,
    );
    const buttons = container.querySelectorAll('.ant-btn');
    expect(buttons[0]).toHaveClass('ant-btn-variant-solid', 'ant-btn-color-primary');
    expect(buttons[1]).toHaveClass('ant-btn-variant-outlined', 'ant-btn-color-primary');
  });

  it('updates inherited variant and semantic props through nested providers', () => {
    const Demo = ({ variant }: Pick<ConfigProviderProps, 'variant'>) => (
      <ConfigProvider variant="outlined">
        <ConfigProvider variant={variant}>
          <Button classNames={({ props }) => ({ root: `semantic-${props.variant}` })}>
            Button
          </Button>
        </ConfigProvider>
      </ConfigProvider>
    );
    const { container, rerender } = render(<Demo variant="filled" />);
    expect(container.firstChild).toHaveClass('ant-btn-variant-filled', 'semantic-filled');

    rerender(<Demo variant="outlined" />);
    expect(container.firstChild).toHaveClass('ant-btn-variant-outlined', 'semantic-outlined');
    expect(container.firstChild).not.toHaveClass('ant-btn-variant-filled');
  });

  it('uses Form variant before component configuration and keeps local props first', () => {
    const { container } = render(
      <ConfigProvider variant="outlined" button={{ variant: 'outlined', color: 'blue' }}>
        <Form variant="filled">
          <Button>Form</Button>
          <Button color="green" variant="solid">
            Local
          </Button>
        </Form>
      </ConfigProvider>,
    );
    const buttons = container.querySelectorAll('.ant-btn');
    expect(buttons[0]).toHaveClass('ant-btn-variant-filled', 'ant-btn-color-blue');
    expect(buttons[1]).toHaveClass('ant-btn-variant-solid', 'ant-btn-color-green');
  });
});
