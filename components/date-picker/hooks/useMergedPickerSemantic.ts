import * as React from 'react';
import cls from 'classnames';

import { useMergeSemantic } from '../../_util/hooks';
import { useComponentConfig } from '../../config-provider/context';
import type {
  PickerClassNames,
  PickerStyles,
  RequiredSemanticPicker,
} from '../generatePicker/interface';

const useMergedPickerSemantic = (
  pickerType: 'timePicker' | 'datePicker',
  classNames?: PickerClassNames,
  styles?: PickerStyles,
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
) => {
  const { classNames: contextClassNames, styles: contextStyles } = useComponentConfig(pickerType);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames as PickerClassNames, classNames as PickerClassNames],
    [contextStyles as PickerStyles, styles as PickerStyles],
    {
      popup: {
        _default: 'root',
      },
    },
  );

  return React.useMemo(() => {
    // ClassNames
    const filledClassNames = {
      ...mergedClassNames,
      popup: {
        ...mergedClassNames.popup,
        root: cls(mergedClassNames.popup?.root, popupClassName),
      },
    };

    // Styles
    const filledStyles = {
      ...mergedStyles,
      popup: {
        ...mergedStyles.popup,
        root: {
          ...mergedStyles.popup?.root,
          ...popupStyle,
        },
      },
    };

    // Return
    return [filledClassNames, filledStyles] as RequiredSemanticPicker;
  }, [mergedClassNames, mergedStyles, popupClassName, popupStyle]);
};

export default useMergedPickerSemantic;
