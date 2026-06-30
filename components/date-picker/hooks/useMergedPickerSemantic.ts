import * as React from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../../_util/hooks/useMergeSemantic';
import type { AnyObject } from '../../_util/type';
import { useComponentConfig } from '../../config-provider/context';

const useMergedPickerSemantic = <P extends AnyObject = AnyObject>(
  pickerType: 'timePicker' | 'datePicker',
  classNames?: P['classNames'],
  styles?: P['styles'],
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
  mergedProps?: P,
  contextStyle?: React.CSSProperties | null,
) => {
  const {
    classNames: contextClassNames,
    style: componentContextStyle,
    styles: contextStyles,
  } = useComponentConfig(pickerType);
  const mergedContextStyle =
    contextStyle === null ? undefined : (contextStyle ?? componentContextStyle);
  const contextStyleRoot = useSemanticRootStyle(mergedContextStyle);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames as P['classNames'], classNames],
    [contextStyles as P['styles'], contextStyleRoot as P['styles'], styles],
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
