import * as React from 'react';
import classNames from 'classnames';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import RCPicker from 'rc-picker';
import type { PickerMode } from 'rc-picker/lib/interface';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import { forwardRef, useContext } from 'react';
import enUS from '../locale/en_US';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
import warning from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import SizeContext from '../../config-provider/SizeContext';
import DisabledContext from '../../config-provider/DisabledContext';
import useStyle from '../style';
import type { PickerProps, PickerLocale, PickerDateProps, PickerTimeProps } from '.';
import { getTimeProps, Components } from '.';
import { FormItemInputContext } from '../../form/context';
import type { InputStatus } from '../../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import type { DatePickRef, PickerComponentClass } from './interface';

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType> & {
    status?: InputStatus;
    hashId?: string;
  };

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker?: PickerMode,
    displayName?: string,
  ) {
    const Picker = forwardRef<DatePickRef<DateType>, InnerPickerProps>((props, ref) => {
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customizeGetPopupContainer,
        className,
        size: customizeSize,
        bordered = true,
        placement,
        placeholder,
        disabled: customDisabled,
        status: customStatus,
        onBlur,
        onFocus,
        dropdownClassName,
        ...restProps
      } = props;

      warning(
        picker !== 'quarter',
        displayName!,
        `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`,
      );

      const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
      const prefixCls = getPrefixCls('picker', customizePrefixCls);
      const pickerRef = (ref as any) || React.createRef<RCPicker<DateType>>();
      const { format, showTime } = props as any;

      const [wrapSSR, hashId] = useStyle(prefixCls);

      const additionalProps = {
        showToday: true,
      };

      let additionalOverrideProps: any = {};
      if (picker) {
        additionalOverrideProps.picker = picker;
      }
      const mergedPicker = picker || props.picker;

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
        ...(mergedPicker === 'time'
          ? getTimeProps({ format, ...props, picker: mergedPicker })
          : {}),
      };
      const rootPrefixCls = getPrefixCls();

      // ===================== Size =====================
      const size = React.useContext(SizeContext);
      const mergedSize = customizeSize || size;

      // ===================== Disabled =====================
      const disabled = React.useContext(DisabledContext);
      const mergedDisabled = customDisabled || disabled;

      // ===================== FormItemInput =====================
      const formItemContext = useContext(FormItemInputContext);
      const { hasFeedback, status: contextStatus, feedbackIcon } = formItemContext;

      const suffixNode = (
        <>
          {mergedPicker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
          {hasFeedback && feedbackIcon}
        </>
      );

      const focus = () => {
        if (pickerRef.current) {
          pickerRef.current.focus();
        }
      };

      const blur = () => {
        if (pickerRef.current) {
          pickerRef.current.blur();
        }
      };

      return wrapSSR(
        <LocaleReceiver componentName="DatePicker" defaultLocale={enUS}>
          {(contextLocale: PickerLocale) => {
            const locale = { ...contextLocale, ...props.locale };

            return (
              <RCPicker<DateType>
                ref={pickerRef}
                placeholder={getPlaceholder(mergedPicker, locale, placeholder)}
                suffixIcon={suffixNode}
                dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
                clearIcon={<CloseCircleFilled />}
                prevIcon={<span className={`${prefixCls}-prev-icon`} />}
                nextIcon={<span className={`${prefixCls}-next-icon`} />}
                superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
                superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
                allowClear
                transitionName={`${rootPrefixCls}-slide-up`}
                onBlur={onBlur || blur}
                onFocus={onFocus || focus}
                {...additionalProps}
                {...restProps}
                {...additionalOverrideProps}
                locale={locale!.lang}
                className={classNames(
                  {
                    [`${prefixCls}-${mergedSize}`]: mergedSize,
                    [`${prefixCls}-borderless`]: !bordered,
                  },
                  getStatusClassNames(
                    prefixCls as string,
                    getMergedStatus(contextStatus, customStatus),
                    hasFeedback,
                  ),
                  hashId,
                  className,
                )}
                prefixCls={prefixCls}
                getPopupContainer={customizeGetPopupContainer || getPopupContainer}
                generateConfig={generateConfig}
                components={Components}
                direction={direction}
                disabled={mergedDisabled}
                dropdownClassName={classNames(hashId, dropdownClassName)}
              />
            );
          }}
        </LocaleReceiver>,
      );
    });

    if (displayName) {
      Picker.displayName = displayName;
    }

    return Picker as unknown as PickerComponentClass<InnerPickerProps>;
  }

  const DatePicker = getPicker<DatePickerProps>();
  const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('week', 'WeekPicker');
  const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('month', 'MonthPicker');
  const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('year', 'YearPicker');
  const TimePicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('time', 'TimePicker');
  const QuarterPicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>(
    'quarter',
    'QuarterPicker',
  );

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker };
}
