import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import cls from 'classnames';
import RCPicker from 'rc-picker';
import type { PickerRef } from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { PickerMode } from 'rc-picker/lib/interface';

import ContextIsolator from '../../_util/ContextIsolator';
import { useZIndex } from '../../_util/hooks';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import type { AnyObject } from '../../_util/type';
import { devUseWarning } from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import useCSSVarCls from '../../config-provider/hooks/useCSSVarCls';
import useVariant from '../../form/hooks/useVariants';
import { useLocale } from '../../locale';
import { useCompactItemContext } from '../../space/Compact';
import usePickerCommonState from '../hooks/usePickerCommonState';
import useMergedPickerSemantic from '../hooks/useMergedPickerSemantic';
import usePickerDeprecatedWarnings from '../hooks/usePickerDeprecatedWarnings';
import enUS from '../locale/en_US';
import useStyle from '../style';
import { getPlaceholder, useIcons } from '../util';
import {
  MONTH,
  MONTHPICKER,
  QUARTER,
  QUARTERPICKER,
  TIME,
  TIMEPICKER,
  WEEK,
  WEEKPICKER,
  YEAR,
  YEARPICKER,
} from './constant';
import type { GenericTimePickerProps, PickerProps, PickerPropsWithMultiple } from './interface';
import SuffixIcon from './SuffixIcon';
import useComponents from './useComponents';

const generatePicker = <DateType extends AnyObject = AnyObject>(
  generateConfig: GenerateConfig<DateType>,
) => {
  type DatePickerProps = PickerProps<DateType>;
  type TimePickerProps = GenericTimePickerProps<DateType>;

  const getPicker = <P extends DatePickerProps>(picker?: PickerMode, displayName?: string) => {
    const consumerName = displayName === TIMEPICKER ? 'timePicker' : 'datePicker';
    const Picker = forwardRef<PickerRef, P>((props, ref) => {
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customizeGetPopupContainer,
        components,
        style,
        className,
        rootClassName,
        size: customizeSize,
        bordered,
        placement,
        placeholder,
        popupStyle,
        popupClassName,
        dropdownClassName,
        disabled: customDisabled,
        status: customStatus,
        variant: customVariant,
        onCalendarChange,
        styles,
        classNames,
        suffixIcon,
        ...restProps
      } = props;

      const {
        getPrefixCls,
        direction,
        getPopupContainer,
        // Consume different styles according to different names
        [consumerName]: consumerStyle,
      } = useContext(ConfigContext);

      const prefixCls = getPrefixCls('picker', customizePrefixCls);
      const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
      const innerRef = React.useRef<PickerRef>(null);

      const [variant, enableVariantCls] = useVariant('datePicker', customVariant, bordered);

      const rootCls = useCSSVarCls(prefixCls);
      const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

      useImperativeHandle(ref, () => innerRef.current!);

      const additionalProps = {
        showToday: true,
      };

      const mergedPicker = picker || props.picker;

      const rootPrefixCls = getPrefixCls();

      // ==================== Legacy =====================
      const { onSelect, multiple } = restProps as TimePickerProps;
      const hasLegacyOnSelect = onSelect && picker === 'time' && !multiple;

      const onInternalCalendarChange: typeof onCalendarChange = (date, dateStr, info) => {
        onCalendarChange?.(date, dateStr, info);

        if (hasLegacyOnSelect) {
          onSelect(date as any);
        }
      };

      // =================== Warning =====================
      if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning(displayName! || 'DatePicker');

        warning(
          picker !== 'quarter',
          'deprecated',
          `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`,
        );
      }

      // ==================== Deprecated Props =====================
      usePickerDeprecatedWarnings(displayName! || 'DatePicker', props);

      const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(
        consumerName,
        classNames,
        styles,
        popupClassName || dropdownClassName,
        popupStyle,
      );

      // ===================== Icon =====================
      const [mergedAllowClear, removeIcon] = useIcons(props, prefixCls);

      // ================== components ==================
      const mergedComponents = useComponents(components);

      // ===================== Common State =====================
      const [mergedSize, mergedDisabled, formItemContext] = usePickerCommonState({
        customizeSize,
        compactSize,
        customDisabled,
      });

      const { hasFeedback, status: contextStatus, feedbackIcon } = formItemContext;

      const mergedSuffixIcon = (
        <SuffixIcon {...{ picker: mergedPicker, hasFeedback, feedbackIcon, suffixIcon }} />
      );
      const [contextLocale] = useLocale('DatePicker', enUS);

      const locale = { ...contextLocale, ...props.locale! };
      // ============================ zIndex ============================
      const [zIndex] = useZIndex('DatePicker', mergedStyles.popup.root?.zIndex as number);

      return wrapCSSVar(
        <ContextIsolator space>
          <RCPicker<DateType>
            ref={innerRef}
            placeholder={getPlaceholder(locale, mergedPicker, placeholder)}
            suffixIcon={mergedSuffixIcon}
            placement={placement}
            prevIcon={<span className={`${prefixCls}-prev-icon`} />}
            nextIcon={<span className={`${prefixCls}-next-icon`} />}
            superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
            superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
            transitionName={`${rootPrefixCls}-slide-up`}
            picker={picker}
            onCalendarChange={onInternalCalendarChange}
            {...additionalProps}
            {...restProps}
            locale={locale!.lang}
            className={cls(
              {
                [`${prefixCls}-${mergedSize}`]: mergedSize,
                [`${prefixCls}-${variant}`]: enableVariantCls,
              },
              getStatusClassNames(
                prefixCls,
                getMergedStatus(contextStatus, customStatus),
                hasFeedback,
              ),
              hashId,
              compactItemClassnames,
              consumerStyle?.className,
              className,
              cssVarCls,
              rootCls,
              rootClassName,
              mergedClassNames.root,
            )}
            style={{ ...consumerStyle?.style, ...style, ...mergedStyles.root }}
            prefixCls={prefixCls}
            getPopupContainer={customizeGetPopupContainer || getPopupContainer}
            generateConfig={generateConfig}
            components={mergedComponents}
            direction={direction}
            disabled={mergedDisabled}
            classNames={{
              popup: cls(hashId, cssVarCls, rootCls, rootClassName, mergedClassNames.popup.root),
            }}
            styles={{
              popup: {
                ...mergedStyles.popup.root,
                zIndex,
              },
            }}
            allowClear={mergedAllowClear}
            removeIcon={removeIcon}
          />
        </ContextIsolator>,
      );
    });

    if (process.env.NODE_ENV !== 'production' && displayName) {
      Picker.displayName = displayName;
    }

    return Picker as unknown as (<ValueType = DateType>(
      props: PickerPropsWithMultiple<DateType, P, ValueType>,
    ) => React.ReactElement) & { displayName?: string };
  };

  const DatePicker = getPicker<DatePickerProps>();
  const WeekPicker = getPicker<Omit<DatePickerProps, 'picker'>>(WEEK, WEEKPICKER);
  const MonthPicker = getPicker<Omit<DatePickerProps, 'picker'>>(MONTH, MONTHPICKER);
  const YearPicker = getPicker<Omit<DatePickerProps, 'picker'>>(YEAR, YEARPICKER);
  const QuarterPicker = getPicker<Omit<DatePickerProps, 'picker'>>(QUARTER, QUARTERPICKER);
  const TimePicker = getPicker<Omit<TimePickerProps, 'picker'>>(TIME, TIMEPICKER);

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker };
};

export default generatePicker;
