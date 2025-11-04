import { useContext } from 'react';

import DisabledContext from '../../config-provider/DisabledContext';
import useSize from '../../config-provider/hooks/useSize';
import { FormItemInputContext } from '../../form/context';
import type { FormItemStatusContextProps } from '../../form/context';

interface UsePickerCommonStateOptions {
  customizeSize?: 'small' | 'middle' | 'large';
  compactSize?: 'small' | 'middle' | 'large';
  customDisabled?: boolean;
}

interface UsePickerCommonStateResult {
  mergedSize: 'small' | 'middle' | 'large' | undefined;
  mergedDisabled: boolean | undefined;
  formItemContext: FormItemStatusContextProps;
}

/**
 * Shared hook for common picker state management including size, disabled state,
 * and form item context. Used by both DatePicker and RangePicker.
 */
const usePickerCommonState = ({
  customizeSize,
  compactSize,
  customDisabled,
}: UsePickerCommonStateOptions): UsePickerCommonStateResult => {
  // ===================== Size =====================
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // ===================== FormItemInput =====================
  const formItemContext = useContext(FormItemInputContext);

  return {
    mergedSize,
    mergedDisabled,
    formItemContext,
  };
};

export default usePickerCommonState;
