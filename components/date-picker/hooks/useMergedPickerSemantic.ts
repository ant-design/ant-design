import cls from 'classnames';

import useMergeSemantic from '../../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../../config-provider/context';
import { SemanticName } from '../../time-picker';

const useMergedPickerSemantic = (
  pickerType: 'timePicker' | 'datePicker',
  classNames?: Partial<Record<SemanticName, string>>,
  styles?: Partial<Record<SemanticName, React.CSSProperties>>,
  rootClassName?: string,
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
) => {
  const { classNames: contextClassNames, styles: contextStyles } = useComponentConfig(pickerType);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
  );

  return React.useMemo(() => {
    // ClassNames
    const {
      content: popupContent,
      item: popupItem,
      root: rootCls,
      popup: popupCls,
      ...restClassNames
    } = mergedClassNames;

    const filledClassNames = {
      ...restClassNames,
      popupContent,
      popupItem,
      root: cls(rootClassName, rootCls),
      popup: cls(popupClassName, popupCls),
    };

    // Styles
    const {
      content: popupContentStyle,
      item: popupItemStyle,
      root: rootStyles,
      popup: popupStyles,
      ...restStyles
    } = mergedStyles;

    const filledStyles = {
      ...restStyles,
      popupContent: popupContentStyle,
      popupItem: popupItemStyle,
      root: rootStyles,
      popup: { ...popupStyle, ...popupStyles },
    };

    // Return
    return [filledClassNames, filledStyles] as const;
  }, [mergedClassNames, mergedStyles, rootClassName, popupClassName, popupStyle]);
};

export default useMergedPickerSemantic;
