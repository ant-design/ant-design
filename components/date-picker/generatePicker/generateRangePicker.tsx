import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import type { RangePickerProps } from '.';
import { Components, getTimeProps } from '.';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import SizeContext from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import { useCompactItemContext } from '../../space/Compact';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import enUS from '../locale/en_US';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import type { CommonPickerMethods, PickerComponentClass } from './interface';
import warning from '../../_util/warning';

export default function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type InternalRangePickerProps = RangePickerProps<DateType> & {};
  type DateRangePickerProps = RangePickerProps<DateType> & {
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName?: string;
    popupClassName?: string;
  };

  const RangePicker = forwardRef<
    InternalRangePickerProps | CommonPickerMethods,
    DateRangePickerProps
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
      popupClassName,
      dropdownClassName,
      status: customStatus,
      ...restProps
    } = props;

    const innerRef = React.useRef<RCRangePicker<DateType>>(null);
    const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
    const { format, showTime, picker } = props as any;
    const rootPrefixCls = getPrefixCls();

    let additionalOverrideProps: any = {};
    additionalOverrideProps = {
      ...additionalOverrideProps,
      ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
      ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
    };

    warning(
      !dropdownClassName,
      'RangePicker',
      '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.',
    );

    // ===================== Size =====================
    const size = React.useContext(SizeContext);
    const mergedSize = compactSize || customizeSize || size;

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

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
        {contextLocale => {
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
                compactItemClassnames,
                className,
              )}
              locale={locale!.lang}
              prefixCls={prefixCls}
              getPopupContainer={customGetPopupContainer || getPopupContainer}
              generateConfig={generateConfig}
              components={Components}
              direction={direction}
              dropdownClassName={popupClassName || dropdownClassName}
            />
          );
        }}
      </LocaleReceiver>
    );
  });

  return RangePicker as unknown as PickerComponentClass<DateRangePickerProps>;
}
