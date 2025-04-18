import cls from 'classnames';

import useMergeSemantic from '../../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../../config-provider/context';
import { SemanticName } from '../../time-picker';

const useMergedPickerSemantic = (
  consumerName?: 'timePicker' | 'datePicker',
  classNames?: Partial<Record<SemanticName, string>>,
  styles?: Partial<Record<SemanticName, React.CSSProperties>>,
  rootClassName?: string,
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
) => {
  const { classNames: contextClassNames, styles: contextStyles } = useComponentConfig(
    consumerName === 'timePicker' ? 'timePicker' : 'datePicker',
  );

  const [
    { content: popupContent, item: popupItem, root: rootCls, popup: popupCls, ...restClassNames },
    {
      content: popupContentStyle,
      item: popupItemStyle,
      root: rootStyles,
      popup: popupStyles,
      ...restStyles
    },
  ] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles]);

  const mergedClassNames = {
    ...restClassNames,
    popupContent,
    popupItem,
    root: cls(rootClassName, rootCls),
    popup: cls(popupClassName, popupCls),
  };

  const mergedStyles = {
    ...restStyles,
    popupContent: popupContentStyle,
    popupItem: popupItemStyle,
    root: rootStyles,
    popup: { ...popupStyle, ...popupStyles },
  };

  return [mergedClassNames, mergedStyles] as const;
};

export default useMergedPickerSemantic;
