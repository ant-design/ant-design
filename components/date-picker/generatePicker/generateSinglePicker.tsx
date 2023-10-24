import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { PickerMode } from 'rc-picker/lib/interface';

import type { PickerProps, PickerTimeProps } from '.';
import type { InputStatus } from '../../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import { devUseWarning } from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import useSize from '../../config-provider/hooks/useSize';
import { FormItemInputContext } from '../../form/context';
import { useLocale } from '../../locale';
import { useCompactItemContext } from '../../space/Compact';
import enUS from '../locale/en_US';
import useStyle from '../style';
import {
  getPlaceholder,
  getTimeProps,
  mergeAllowClear,
  transPlacement2DropdownAlign,
} from '../util';
import Components from './Components';
import type { CommonPickerMethods, DatePickRef, PickerComponentClass } from './interface';
import { useZIndex } from '../../_util/hooks/useZIndex';

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
    const consumerName = displayName === 'TimePicker' ? 'timePicker' : 'datePicker';
    const Picker = forwardRef<DatePickRef<DateType> | CommonPickerMethods, InnerPickerProps>(
      (props, ref) => {
        const {
          prefixCls: customizePrefixCls,
          getPopupContainer: customizeGetPopupContainer,
          style,
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
          clearIcon,
          allowClear,
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
          const warning = devUseWarning(displayName! || 'DatePicker');

          warning(
            picker !== 'quarter',
            'deprecated',
            `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`,
          );

          warning.deprecated(!dropdownClassName, 'dropdownClassName', 'popupClassName');
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
        // ============================ zIndex ============================
        const [zIndex] = useZIndex('DatePicker', props.popupStyle?.zIndex as number);

        return wrapSSR(
          <RCPicker<DateType>
            ref={innerRef}
            placeholder={getPlaceholder(locale, mergedPicker, placeholder)}
            suffixIcon={suffixNode}
            dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
            prevIcon={<span className={`${prefixCls}-prev-icon`} />}
            nextIcon={<span className={`${prefixCls}-next-icon`} />}
            superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
            superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
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
                prefixCls,
                getMergedStatus(contextStatus, customStatus),
                hasFeedback,
              ),
              hashId,
              compactItemClassnames,
              consumerStyle?.className,
              className,
              rootClassName,
            )}
            style={{ ...consumerStyle?.style, ...style }}
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
            popupStyle={{
              ...props.popupStyle,
              zIndex,
            }}
            allowClear={mergeAllowClear(allowClear, clearIcon, <CloseCircleFilled />)}
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
