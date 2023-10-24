import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';

import type { RangePickerProps } from '.';
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
  getRangePlaceholder,
  getTimeProps,
  mergeAllowClear,
  transPlacement2DropdownAlign,
} from '../util';
import Components from './Components';
import type { CommonPickerMethods, PickerComponentClass } from './interface';
import { useZIndex } from '../../_util/hooks/useZIndex';

export default function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type InternalRangePickerProps = RangePickerProps<DateType> & {};
  type DateRangePickerProps = RangePickerProps<DateType> & {
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName?: string;
    popupClassName?: string;
    rootClassName?: string;
  };

  const RangePicker = forwardRef<
    InternalRangePickerProps | CommonPickerMethods,
    DateRangePickerProps
  >((props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      getPopupContainer: customGetPopupContainer,
      className,
      style,
      placement,
      size: customizeSize,
      disabled: customDisabled,
      bordered = true,
      placeholder,
      popupClassName,
      dropdownClassName,
      status: customStatus,
      clearIcon,
      allowClear,
      rootClassName,
      ...restProps
    } = props;

    const innerRef = React.useRef<RCRangePicker<DateType>>(null);
    const { getPrefixCls, direction, getPopupContainer, rangePicker } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
    const { format, showTime, picker } = props as any;
    const rootPrefixCls = getPrefixCls();

    const [wrapSSR, hashId] = useStyle(prefixCls);

    const additionalOverrideProps: any = {
      ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
      ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
    };

    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('DatePicker.RangePicker');

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
        {picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {hasFeedback && feedbackIcon}
      </>
    );

    useImperativeHandle(ref, () => ({
      focus: () => innerRef.current?.focus(),
      blur: () => innerRef.current?.blur(),
    }));

    const [contextLocale] = useLocale('Calendar', enUS);

    const locale = { ...contextLocale, ...props.locale! };

    // ============================ zIndex ============================
    const [zIndex] = useZIndex('DatePicker', props.popupStyle?.zIndex as number);

    return wrapSSR(
      <RCRangePicker<DateType>
        separator={
          <span aria-label="to" className={`${prefixCls}-separator`}>
            <SwapRightOutlined />
          </span>
        }
        disabled={mergedDisabled}
        ref={innerRef}
        dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
        placeholder={getRangePlaceholder(locale, picker, placeholder)}
        suffixIcon={suffixNode}
        prevIcon={<span className={`${prefixCls}-prev-icon`} />}
        nextIcon={<span className={`${prefixCls}-next-icon`} />}
        superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
        superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
        transitionName={`${rootPrefixCls}-slide-up`}
        {...restProps}
        {...additionalOverrideProps}
        className={classNames(
          {
            [`${prefixCls}-${mergedSize}`]: mergedSize,
            [`${prefixCls}-borderless`]: !bordered,
          },
          getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback),
          hashId,
          compactItemClassnames,
          className,
          rangePicker?.className,
          rootClassName,
        )}
        style={{ ...rangePicker?.style, ...style }}
        locale={locale.lang}
        prefixCls={prefixCls}
        getPopupContainer={customGetPopupContainer || getPopupContainer}
        generateConfig={generateConfig}
        components={Components}
        direction={direction}
        dropdownClassName={classNames(hashId, popupClassName || dropdownClassName, rootClassName)}
        popupStyle={{
          ...props.popupStyle,
          zIndex,
        }}
        allowClear={mergeAllowClear(allowClear, clearIcon, <CloseCircleFilled />)}
      />,
    );
  });

  if (process.env.NODE_ENV !== 'production') {
    RangePicker.displayName = 'RangePicker';
  }

  return RangePicker as unknown as PickerComponentClass<DateRangePickerProps>;
}
