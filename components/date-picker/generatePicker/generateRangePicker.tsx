import * as React from 'react';
import classNames from 'classnames';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import flow from 'lodash/flow';
import { RangePicker as RCRangePicker } from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import enUS from '../locale/en_US';
import { ConfigContext, ConfigConsumerProps } from '../../config-provider';
import SizeContext from '../../config-provider/SizeContext';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getRangePlaceholder } from '../util';
import { RangePickerProps, PickerLocale, getTimeProps, Components } from '.';

export default function generateRangePicker<DateType>(
  generateConfig: GenerateConfig<DateType>,
): React.ComponentClass<RangePickerProps<DateType>> {
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

    getDefaultLocale = () => {
      const { locale } = this.props;
      const result = {
        ...enUS,
        ...locale,
      };
      result.lang = {
        ...result.lang,
        ...((locale || {}) as PickerLocale).lang,
      };
      return result;
    };

    renderPicker = (locale: PickerLocale) => {
      const { getPrefixCls, direction, getPopupContainer } = this.context;
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customGetPopupContainer,
        className,
        size: customizeSize,
        bordered = true,
        panelRender: customizepanelRender,
        placeholder,
        renderSidebar,
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

      const panelRenders: ((node: React.ReactNode) => React.ReactNode)[] = [];

      if (renderSidebar) {
        panelRenders.push((node: React.ReactNode) => (
          <div className={`${prefixCls}-sidebar-panel`}>
            <div className={`${prefixCls}-sidebar`}>{renderSidebar()}</div>
            {node}
          </div>
        ));
      }
      if (customizepanelRender) {
        panelRenders.push(customizepanelRender as (node: React.ReactNode) => React.ReactNode);
      }
      const panelRender = panelRenders.length > 0 ? flow(panelRenders) : null;

      return (
        <SizeContext.Consumer>
          {size => {
            const mergedSize = customizeSize || size;

            return (
              <RCRangePicker<DateType>
                separator={
                  <span aria-label="to" className={`${prefixCls}-separator`}>
                    <SwapRightOutlined />
                  </span>
                }
                ref={this.pickerRef}
                placeholder={getRangePlaceholder(picker, locale, placeholder)}
                suffixIcon={picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
                clearIcon={<CloseCircleFilled />}
                allowClear
                transitionName="slide-up"
                {...restProps}
                {...additionalOverrideProps}
                className={classNames(
                  {
                    [`${prefixCls}-${mergedSize}`]: mergedSize,
                    [`${prefixCls}-borderless`]: !bordered,
                  },
                  className,
                )}
                locale={locale!.lang}
                prefixCls={prefixCls}
                getPopupContainer={customGetPopupContainer || getPopupContainer}
                panelRender={panelRender}
                generateConfig={generateConfig}
                prevIcon={<span className={`${prefixCls}-prev-icon`} />}
                nextIcon={<span className={`${prefixCls}-next-icon`} />}
                superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
                superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
                components={Components}
                direction={direction}
              />
            );
          }}
        </SizeContext.Consumer>
      );
    };

    render() {
      return (
        <LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  }

  return RangePicker;
}
