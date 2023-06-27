import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { PickerMode } from 'rc-picker/lib/interface';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import type { PickerProps, PickerTimeProps } from '.';
import { Components, getTimeProps } from '.';
import type { InputStatus } from '../../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import warning from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import useSize from '../../config-provider/hooks/useSize';
import { FormItemInputContext } from '../../form/context';
import { useLocale } from '../../locale';
import { useCompactItemContext } from '../../space/Compact';
import enUS from '../locale/en_US';
import useStyle from '../style';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
import type { CommonPickerMethods, DatePickRef, PickerComponentClass } from './interface';

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type CustomPickerProps = {
    status?: InputStatus;
    hashId?: string;
    popupClassName?: string;
    rootClassName?: string;
  };
  type DatePickerProps = PickerProps<DateType> & CustomPickerProps;
  type TimePickerProps = PickerTimeProps<DateType> & CustomPickerProps;

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker?: PickerMode,
    displayName?: string,
  ) {
    const Picker = forwardRef<DatePickRef<DateType> | CommonPickerMethods, InnerPickerProps>(
      (props, ref) => {
        const {
          prefixCls: customizePrefixCls,
          getPopupContainer: customizeGetPopupContainer,
          className,
          rootClassName,
          size: customizeSize,
          bordered = true,
          placement,
          placeholder,
          popupClassName,
          dropdownClassName,
          disabled: customDisabled,
          status: customStatus,
          ...restProps
        } = props;

        const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
        const prefixCls = getPrefixCls('picker', customizePrefixCls);
        const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
        const innerRef = React.useRef<RCPicker<DateType>>(null);
        const { format, showTime } = props as any;

        const [wrapSSR, hashId] = useStyle(prefixCls);

        useImperativeHandle(ref, () => ({
          focus: () => innerRef.current?.focus(),
          blur: () => innerRef.current?.blur(),
        }));

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

        // =================== Warning =====================
        if (process.env.NODE_ENV !== 'production') {
          warning(
            picker !== 'quarter',
            displayName!,
            `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`,
          );

          warning(
            !dropdownClassName,
            displayName || 'DatePicker',
            '`dropdownClassName` is deprecated. Please use `popupClassName` instead.',
          );
        }

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

        return wrapSSR(
          <RCPicker<DateType>
            ref={innerRef}
            placeholder={getPlaceholder(locale, mergedPicker, placeholder)}
            suffixIcon={suffixNode}
            dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
            clearIcon={<CloseCircleFilled />}
            prevIcon={<span className={`${prefixCls}-prev-icon`} />}
            nextIcon={<span className={`${prefixCls}-next-icon`} />}
            superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
            superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
            allowClear
            transitionName={`${rootPrefixCls}-slide-up`}
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
              compactItemClassnames,
              className,
              rootClassName,
            )}
            prefixCls={prefixCls}
            getPopupContainer={customizeGetPopupContainer || getPopupContainer}
            generateConfig={generateConfig}
            components={Components}
            direction={direction}
            disabled={mergedDisabled}
            dropdownClassName={classNames(
              hashId,
              rootClassName,
              popupClassName || dropdownClassName,
            )}
          />,
        );
      },
    );

    if (displayName) {
      Picker.displayName = displayName;
    }

    return Picker as unknown as PickerComponentClass<InnerPickerProps>;
  }

  const DatePicker = getPicker<DatePickerProps>();
  const WeekPicker = getPicker<Omit<DatePickerProps, 'picker'>>('week', 'WeekPicker');
  const MonthPicker = getPicker<Omit<DatePickerProps, 'picker'>>('month', 'MonthPicker');
  const YearPicker = getPicker<Omit<DatePickerProps, 'picker'>>('year', 'YearPicker');
  const TimePicker = getPicker<Omit<TimePickerProps, 'picker'>>('time', 'TimePicker');
  const QuarterPicker = getPicker<Omit<TimePickerProps, 'picker'>>('quarter', 'QuarterPicker');

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker };
}
