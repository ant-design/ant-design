import { useContext } from 'react';

import DisabledContext from '../../config-provider/DisabledContext';
import useSize from '../../config-provider/hooks/useSize';
import type { SizeType } from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import type { FormItemStatusContextProps } from '../../form/context';

/**
 * Shared hook for common picker state management including size, disabled state,
 * and form item context. Used by both DatePicker and RangePicker.
 */
const usePickerCommonState = (
  customizeSize?: SizeType,
  compactSize?: SizeType,
  customDisabled?: boolean,
): [SizeType, boolean | undefined, FormItemStatusContextProps] => {
  // ===================== Size =====================
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // ===================== FormItemInput =====================
  const formItemContext = useContext(FormItemInputContext);

  return [mergedSize, mergedDisabled, formItemContext];
};

export default usePickerCommonState;
