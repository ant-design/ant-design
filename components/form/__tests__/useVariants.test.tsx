import React from 'react';

import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ConfigProviderProps } from '../../config-provider';
import useVariant from '../hooks/useVariants';

const variants = ['outlined', 'filled', 'dashed'] as const;
type TestVariant = (typeof variants)[number];

const Demo: React.FC<{
  variant?: TestVariant | ConfigProviderProps['variant'];
  defaultVariant?: TestVariant;
}> = ({ variant, defaultVariant = 'outlined' }) => {
  const [mergedVariant, enableVariantCls, isVariantConfigured]: [TestVariant, boolean, boolean] =
    useVariant('input', variant, {
      variants,
      defaultVariant,
    });

  return (
    <div
      data-variant={mergedVariant}
      data-enabled={enableVariantCls}
      data-configured={isVariantConfigured}
    />
  );
};

describe('useVariant', () => {
  it.each(variants)('supports %s in a list containing more than two variants', (variant) => {
    const { container } = render(<Demo variant={variant} />);

    expect(container.firstChild).toHaveAttribute('data-variant', variant);
    expect(container.firstChild).toHaveAttribute('data-enabled', 'true');
    expect(container.firstChild).toHaveAttribute('data-configured', 'true');
  });

  it.each<[ConfigProviderProps['variant'], TestVariant]>([
    ['filled', 'filled'],
    ['outlined', 'outlined'],
    ['borderless', 'dashed'],
    ['underlined', 'dashed'],
  ])('resolves global variant %s to %s', (variant, expected) => {
    const { container } = render(
      <ConfigProvider variant={variant}>
        <Demo defaultVariant="dashed" />
      </ConfigProvider>,
    );

    expect(container.firstChild).toHaveAttribute('data-variant', expected);
    expect(container.firstChild).toHaveAttribute('data-enabled', 'true');
    expect(container.firstChild).toHaveAttribute('data-configured', 'true');
  });

  it('uses the supplied default without treating it as an explicit configuration', () => {
    const { container } = render(<Demo defaultVariant="dashed" />);

    expect(container.firstChild).toHaveAttribute('data-variant', 'dashed');
    expect(container.firstChild).toHaveAttribute('data-enabled', 'true');
    expect(container.firstChild).toHaveAttribute('data-configured', 'false');
  });

  it.each(['borderless', 'underlined'] as const)(
    'narrows unsupported input %s to a supported value',
    (variant) => {
      const { container } = render(<Demo variant={variant} />);

      expect(container.firstChild).toHaveAttribute('data-variant', 'outlined');
      expect(container.firstChild).toHaveAttribute('data-enabled', 'true');
    },
  );

  it('preserves the legacy bordered argument', () => {
    const LegacyDemo = () => {
      const [variant, enabled, configured] = useVariant('input', undefined, false);
      return <div data-variant={variant} data-enabled={enabled} data-configured={configured} />;
    };
    const { container } = render(<LegacyDemo />);

    expect(container.firstChild).toHaveAttribute('data-variant', 'borderless');
    expect(container.firstChild).toHaveAttribute('data-enabled', 'true');
    expect(container.firstChild).toHaveAttribute('data-configured', 'true');
  });

  it('preserves the fallback component argument', () => {
    const LegacyDemo = () => {
      const [variant] = useVariant('inputSearch', undefined, undefined, 'input');
      return <div data-variant={variant} />;
    };
    const { container } = render(
      <ConfigProvider variant="borderless" input={{ variant: 'filled' }}>
        <LegacyDemo />
      </ConfigProvider>,
    );

    expect(container.firstChild).toHaveAttribute('data-variant', 'filled');
  });
});
