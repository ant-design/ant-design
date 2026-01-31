import * as React from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../../_util/hooks';
import type { AnyObject } from '../../_util/type';
import { useComponentConfig } from '../../config-provider/context';

const useMergedPickerSemantic = <P extends AnyObject = AnyObject>(
  pickerType: 'timePicker' | 'datePicker',
  classNames?: P['classNames'],
  styles?: P['styles'],
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
  mergedProps?: P,
) => {
  const { classNames: contextClassNames, styles: contextStyles } = useComponentConfig(pickerType);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<P['classNames'], P['styles'], P>(
    [contextClassNames as P['classNames'], classNames],
    [contextStyles as P['styles'], styles],
    { props: mergedProps as P },
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
        root: clsx(mergedClassNames.popup?.root, popupClassName),
      },
    };

    // Styles
    const filledStyles = {
      ...mergedStyles,
      popup: { ...mergedStyles.popup, root: { ...mergedStyles.popup?.root, ...popupStyle } },
    };

    // Return
    return [filledClassNames, filledStyles];
  }, [mergedClassNames, mergedStyles, popupClassName, popupStyle]);
};

export default useMergedPickerSemantic;
