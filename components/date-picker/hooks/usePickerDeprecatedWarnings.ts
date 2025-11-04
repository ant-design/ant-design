import useDeprecatedWarnings from '../../_util/useDeprecatedWarnings';

/**
 * Shared hook for displaying deprecation warnings on DatePicker components.
 * Warns about deprecated props that have been replaced with new alternatives.
 */
const usePickerDeprecatedWarnings = (
  componentName: string,
  props: Record<string, any>,
): void => {
  const deprecatedProps = {
    dropdownClassName: 'classNames.popup.root',
    popupClassName: 'classNames.popup.root',
    popupStyle: 'styles.popup.root',
    bordered: 'variant',
    onSelect: 'onCalendarChange',
  };

  useDeprecatedWarnings(componentName, props, deprecatedProps);
};

export default usePickerDeprecatedWarnings;
