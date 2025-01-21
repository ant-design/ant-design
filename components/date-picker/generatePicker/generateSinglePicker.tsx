import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import type { PickerRef } from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { PickerMode } from 'rc-picker/lib/interface';

import ContextIsolator from '../../_util/ContextIsolator';
import { useZIndex } from '../../_util/hooks/useZIndex';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import type { AnyObject } from '../../_util/type';
import { devUseWarning } from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import useCSSVarCls from '../../config-provider/hooks/useCSSVarCls';
import useSize from '../../config-provider/hooks/useSize';
import { FormItemInputContext } from '../../form/context';
import useVariant from '../../form/hooks/useVariants';
import { useLocale } from '../../locale';
import { useCompactItemContext } from '../../space/Compact';
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
        popupClassName,
        dropdownClassName,
        disabled: customDisabled,
        status: customStatus,
        variant: customVariant,
        onCalendarChange,
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

        warning.deprecated(!dropdownClassName, 'dropdownClassName', 'popupClassName');

        warning.deprecated(!('bordered' in props), 'bordered', 'variant');

        warning.deprecated(!hasLegacyOnSelect, 'onSelect', 'onCalendarChange');
      }

      // ===================== Icon =====================
      const [mergedAllowClear, removeIcon] = useIcons(props, prefixCls);

      // ================== components ==================
      const mergedComponents = useComponents(components);

      // ===================== Size =====================
      const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

      // ===================== Disabled =====================
      const disabled = React.useContext(DisabledContext);
      const mergedDisabled = customDisabled ?? disabled;

      // ===================== FormItemInput =====================
      const formItemContext = useContext(FormItemInputContext);
      const { hasFeedback, status: contextStatus, feedbackIcon } = formItemContext;

      const suffixNode = (
        <>
          {mergedPicker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
          {hasFeedback && feedbackIcon}
        </>
      );

      const [contextLocale] = useLocale('DatePicker', enUS);

      const locale = { ...contextLocale, ...props.locale! };
      // ============================ zIndex ============================
      const [zIndex] = useZIndex('DatePicker', props.popupStyle?.zIndex as number);

      return wrapCSSVar(
        <ContextIsolator space>
          <RCPicker<DateType>
            ref={innerRef}
            placeholder={getPlaceholder(locale, mergedPicker, placeholder)}
            suffixIcon={suffixNode}
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
            className={classNames(
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
            )}
            style={{ ...consumerStyle?.style, ...style }}
            prefixCls={prefixCls}
            getPopupContainer={customizeGetPopupContainer || getPopupContainer}
            generateConfig={generateConfig}
            components={mergedComponents}
            direction={direction}
            disabled={mergedDisabled}
            classNames={{
              popup: classNames(
                hashId,
                cssVarCls,
                rootCls,
                rootClassName,
                popupClassName || dropdownClassName,
              ),
            }}
            styles={{
              popup: {
                ...props.popupStyle,
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
