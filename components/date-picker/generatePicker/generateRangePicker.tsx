import * as React from 'react';
import { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import { RangePicker as RCRangePicker } from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import enUS from '../locale/en_US';
import { ConfigContext } from '../../config-provider';
import SizeContext from '../../config-provider/SizeContext';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import { Components, getTimeProps, PickerLocale, RangePickerProps } from '.';
import { FormItemInputContext } from '../../form/context';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import { PickerComponentClass } from './interface';
import useStyle from '../style';

export default function generateRangePicker<DateType>(
  generateConfig: GenerateConfig<DateType>,
): PickerComponentClass<RangePickerProps<DateType>> {
  type InternalRangePickerProps = RangePickerProps<DateType> & {
    hashId?: string;
  };

  const RangePicker = forwardRef<InternalRangePickerProps, RangePickerProps<DateType>>(
    (props, ref) => {
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customGetPopupContainer,
        className,
        placement,
        size: customizeSize,
        bordered = true,
        placeholder,
        status: customStatus,
        dropdownClassName,
        ...restProps
      } = props;

      const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
      const prefixCls = getPrefixCls('picker', customizePrefixCls);
      const [wrapSSR, hashId] = useStyle(prefixCls);
      const pickerRef = (ref as any) || React.createRef<RCRangePicker<DateType>>();
      const { format, showTime, picker } = props as any;
      let additionalOverrideProps: any = {};

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
        ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
      };
      const rootPrefixCls = getPrefixCls();
      const size = React.useContext(SizeContext);
      const mergedSize = customizeSize || size;

      const formItemContext = useContext(FormItemInputContext);
      const { hasFeedback, status: contextStatus, feedbackIcon } = formItemContext;
      const suffixNode = (
        <>
          {picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
          {hasFeedback && feedbackIcon}
        </>
      );
      console.log('additionalOverrideProps', additionalOverrideProps);

      return wrapSSR(
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
                ref={pickerRef}
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
                  hashId,
                  className,
                )}
                locale={locale!.lang}
                prefixCls={prefixCls}
                getPopupContainer={customGetPopupContainer || getPopupContainer}
                generateConfig={generateConfig}
                components={Components}
                direction={direction}
                dropdownClassName={classNames(hashId, dropdownClassName)}
              />
            );
          }}
        </LocaleReceiver>,
      );
    },
  );
  return RangePicker as unknown as PickerComponentClass<RangePickerProps<DateType>>;
}
