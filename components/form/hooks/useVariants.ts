import * as React from 'react';

import { VariantContext } from '../context';
import type { Variant, ConfigProviderProps } from '../../config-provider';
import { ConfigContext, Variants } from '../../config-provider';

type VariantComponents = keyof Pick<
  ConfigProviderProps,
  | 'input'
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
  variant: Variant | undefined,
  legacyBordered: boolean | undefined = undefined,
): [Variant, boolean] => {
  const { variant: configVariant, [component]: componentConfig } = React.useContext(ConfigContext);
  const ctxVariant = React.useContext(VariantContext);
  const configComponentVariant = componentConfig?.variant;

  let mergedVariant: Variant;
  if (typeof variant !== 'undefined') {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = 'borderless';
  } else {
    // form variant > component global variant > global variant
    mergedVariant = ctxVariant ?? configComponentVariant ?? configVariant ?? 'outlined';
  }

  const enableVariantCls = Variants.includes(mergedVariant);
  return [mergedVariant, enableVariantCls];
};

export default useVariant;
