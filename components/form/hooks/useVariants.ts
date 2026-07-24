import * as React from 'react';

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

/**
 * Compatible for legacy `bordered` prop.
 */
const useVariant = (
  component: VariantComponents,
  variant?: Variant,
  legacyBordered?: boolean,
  fallbackComponent?: VariantComponents,
): [Variant, boolean, boolean] => {
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

  let mergedVariant: Variant;
  if (typeof variant !== 'undefined') {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = 'borderless';
  } else {
    // form variant > component global variant > fallback component global variant > global variant
    mergedVariant = ctxVariant ?? configComponentVariant ?? configVariant ?? 'outlined';
  }

  const enableVariantCls = Variants.includes(mergedVariant);
  return [mergedVariant, enableVariantCls, isVariantConfigured];
};

export default useVariant;
