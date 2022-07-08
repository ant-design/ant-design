import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import type { PickerLocale, RangePickerProps } from '.';
import { Components, getTimeProps } from '.';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import SizeContext from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import enUS from '../locale/en_US';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import type { CommonPickerMethods, PickerComponentClass } from './interface';

export default function generateRangePicker<DateType>(
  generateConfig: GenerateConfig<DateType>,
): PickerComponentClass<RangePickerProps<DateType>> {
  type InternalRangePickerProps = RangePickerProps<DateType> & {};

  const RangePicker = forwardRef<
    InternalRangePickerProps | CommonPickerMethods,
    RangePickerProps<DateType>
  >((props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      getPopupContainer: customGetPopupContainer,
      className,
      placement,
      size: customizeSize,
      disabled: customDisabled,
      bordered = true,
      placeholder,
      status: customStatus,
      ...restProps
    } = props;

    const innerRef = React.useRef<RCRangePicker<DateType>>(null);
    const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const { format, showTime, picker } = props as any;
    const rootPrefixCls = getPrefixCls();

    let additionalOverrideProps: any = {};
    additionalOverrideProps = {
      ...additionalOverrideProps,
      ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
      ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
    };

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
        {picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {hasFeedback && feedbackIcon}
      </>
    );

    useImperativeHandle(ref, () => ({
      focus: () => innerRef.current?.focus(),
      blur: () => innerRef.current?.blur(),
    }));

    return (
      <LocaleReceiver componentName="DatePicker" defaultLocale={enUS}>
        {(contextLocale: PickerLocale) => {
          const locale = { ...contextLocale, ...props.locale };

          return (
            <RCRangePicker<DateType>
              separator={
                <span aria-label="to" className={`${prefixCls}-separator`}>
                  <SwapRightOutlined />
                </span>
              }
              disabled={mergedDisabled}
              ref={innerRef}
              dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
              placeholder={getRangePlaceholder(picker, locale, placeholder)}
              suffixIcon={suffixNode}
              clearIcon={<CloseCircleFilled />}
              prevIcon={<span className={`${prefixCls}-prev-icon`} />}
              nextIcon={<span className={`${prefixCls}-next-icon`} />}
              superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
              superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
              allowClear
              transitionName={`${rootPrefixCls}-slide-up`}
              {...restProps}
              {...additionalOverrideProps}
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
                className,
              )}
              locale={locale!.lang}
              prefixCls={prefixCls}
              getPopupContainer={customGetPopupContainer || getPopupContainer}
              generateConfig={generateConfig}
              components={Components}
              direction={direction}
            />
          );
        }}
      </LocaleReceiver>
    );
  });

  return RangePicker as unknown as PickerComponentClass<RangePickerProps<DateType>>;
}
