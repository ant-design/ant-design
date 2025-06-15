import * as React from 'react';
import type { PickerProps } from '@rc-component/picker';
import cls from 'classnames';

import useMergeSemantic from '../../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../../config-provider/context';
import type { PickerClassNames, RequiredSemanticPicker } from '../generatePicker/interface';

const useMergedPickerSemantic = (
  pickerType: 'timePicker' | 'datePicker',
  classNames?: PickerClassNames,
  styles?: PickerProps['styles'],
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
) => {
  const { classNames: contextClassNames, styles: contextStyles } = useComponentConfig(pickerType);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames as PickerProps['classNames'], classNames as PickerProps['classNames']],
    [contextStyles as PickerProps['styles'], styles],
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
