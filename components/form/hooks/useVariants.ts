import * as React from 'react';

import { isPlainObject } from '../../_util/is';
import type { ConfigProviderProps, Variant } from '../../config-provider';
import { ConfigContext, Variants } from '../../config-provider';
import { VariantContext } from '../context';

type VariantComponents = keyof Pick<
  ConfigProviderProps,
  | 'input'
  | 'inputPassword'
  | 'inputSearch'
  | 'otp'
  | 'inputNumber'
  | 'textArea'
  | 'mentions'
  | 'select'
  | 'cascader'
  | 'treeSelect'
  | 'datePicker'
  | 'timePicker'
  | 'rangePicker'
  | 'card'
>;

interface VariantOptions<T extends readonly string[]> {
  variants: T;
  defaultVariant: T[number];
}

type VariantResult<T extends string> = [T, boolean, boolean];

interface UseVariant {
  <const T extends readonly string[]>(
    component: VariantComponents,
    variant: string | undefined,
    options: VariantOptions<T>,
  ): VariantResult<T[number]>;
  (
    component: VariantComponents,
    variant?: Variant,
    legacyBordered?: boolean,
    fallbackComponent?: VariantComponents,
  ): VariantResult<Variant>;
}

/**
 * Compatible for legacy `bordered` prop.
 */
const useVariant = (
  component: VariantComponents,
  variant?: string,
  legacyBordered?: boolean | VariantOptions<readonly string[]>,
  fallbackComponent?: VariantComponents,
): VariantResult<string> => {
  const options = isPlainObject<VariantOptions<readonly string[]>>(legacyBordered)
    ? legacyBordered
    : undefined;
  const config = React.useContext(ConfigContext);
  const { variant: configVariant, [component]: componentConfig } = config;
  const ctxVariant = React.useContext(VariantContext);
  const fallbackComponentConfig = fallbackComponent ? config[fallbackComponent] : undefined;
  const configComponentVariant = componentConfig?.variant ?? fallbackComponentConfig?.variant;
  const isVariantConfigured =
    typeof variant !== 'undefined' ||
    legacyBordered === false ||
    typeof ctxVariant !== 'undefined' ||
    typeof configComponentVariant !== 'undefined' ||
    typeof configVariant !== 'undefined';

  let mergedVariant: string;
  if (typeof variant !== 'undefined') {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = 'borderless';
  } else {
    // form variant > component global variant > fallback component global variant > global variant
    mergedVariant =
      ctxVariant ??
      configComponentVariant ??
      configVariant ??
      options?.defaultVariant ??
      'outlined';
  }

  if (options && !options.variants.includes(mergedVariant)) {
    mergedVariant = options.defaultVariant;
  }

  const enableVariantCls = (options?.variants ?? Variants).includes(mergedVariant);
  return [mergedVariant, enableVariantCls, isVariantConfigured];
};

export default useVariant as UseVariant;
