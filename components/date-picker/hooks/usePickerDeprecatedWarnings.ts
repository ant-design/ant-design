import { devUseWarning } from '../../_util/warning';

/**
 * Shared hook for displaying deprecation warnings on DatePicker components.
 * Warns about deprecated props that have been replaced with new alternatives.
 */
const usePickerDeprecatedWarnings = (
  componentName: string,
  props: Record<string, unknown>,
): void => {
  const warning = devUseWarning(componentName);

  const deprecatedProps = {
    dropdownClassName: 'classNames.popup.root',
    popupClassName: 'classNames.popup.root',
    popupStyle: 'styles.popup.root',
    bordered: 'variant',
    onSelect: 'onCalendarChange',
  };

  Object.entries(deprecatedProps).forEach(([oldProp, newProp]) => {
    warning.deprecated(!(oldProp in props), oldProp, newProp);
  });
};

export default usePickerDeprecatedWarnings;
