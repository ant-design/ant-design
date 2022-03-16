import * as React from 'react';
import classNames from 'classnames';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import { RangePicker as RCRangePicker } from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerMode } from 'rc-picker/lib/interface';
import enUS from '../locale/en_US';
import { ConfigContext, ConfigConsumerProps } from '../../config-provider';
import SizeContext from '../../config-provider/SizeContext';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import { RangePickerProps, PickerLocale, getTimeProps, Components } from '.';
import { PickerComponentClass } from './interface';
import { FormItemStatusContext } from '../../form/context';
import { getFeedbackIcon, getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';

export default function generateRangePicker<DateType>(
  generateConfig: GenerateConfig<DateType>,
): PickerComponentClass<RangePickerProps<DateType>> {
  class RangePicker extends React.Component<RangePickerProps<DateType>> {
    static contextType = ConfigContext;

    context: ConfigConsumerProps;

    pickerRef = React.createRef<RCRangePicker<DateType>>();

    focus = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.focus();
      }
    };

    blur = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.blur();
      }
    };

    renderFeedback = (prefixCls: string) => (
      <FormItemStatusContext.Consumer>
        {({ hasFeedback, status: contextStatus }) => {
          const { status: customStatus } = this.props;
          const status = getMergedStatus(contextStatus, customStatus);
          return hasFeedback && getFeedbackIcon(prefixCls, status);
        }}
      </FormItemStatusContext.Consumer>
    );

    renderSuffix = (prefixCls: string, mergedPicker?: PickerMode) => (
      <>
        {mergedPicker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {this.renderFeedback(prefixCls)}
      </>
    );

    renderPicker = (contextLocale: PickerLocale) => {
      const locale = { ...contextLocale, ...this.props.locale };
      const { getPrefixCls, direction, getPopupContainer } = this.context;
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customGetPopupContainer,
        className,
        placement,
        size: customizeSize,
        bordered = true,
        placeholder,
        status: customStatus,
        ...restProps
      } = this.props;
      const { format, showTime, picker } = this.props as any;
      const prefixCls = getPrefixCls('picker', customizePrefixCls);

      let additionalOverrideProps: any = {};

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
        ...(picker === 'time' ? getTimeProps({ format, ...this.props, picker }) : {}),
      };
      const rootPrefixCls = getPrefixCls();

      return (
        <SizeContext.Consumer>
          {size => {
            const mergedSize = customizeSize || size;

            return (
              <FormItemStatusContext.Consumer>
                {({ hasFeedback, status: contextStatus }) => (
                  <RCRangePicker<DateType>
                    separator={
                      <span aria-label="to" className={`${prefixCls}-separator`}>
                        <SwapRightOutlined />
                      </span>
                    }
                    ref={this.pickerRef}
                    dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
                    placeholder={getRangePlaceholder(picker, locale, placeholder)}
                    suffixIcon={this.renderSuffix(prefixCls, picker)}
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
                        prefixCls,
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
                )}
              </FormItemStatusContext.Consumer>
            );
          }}
        </SizeContext.Consumer>
      );
    };

    render() {
      return (
        <LocaleReceiver componentName="DatePicker" defaultLocale={enUS}>
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  }

  return RangePicker;
}
