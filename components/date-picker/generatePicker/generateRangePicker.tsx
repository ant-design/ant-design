import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import classNames from 'classnames';
import { RangePicker as RCRangePicker, type PickerRef } from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';

import type { RangePickerProps } from '.';
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
import { getRangePlaceholder, mergeAllowClear, transPlacement2DropdownAlign } from '../util';
import Components from './Components';

export default function generateRangePicker<DateType extends AnyObject>(
  generateConfig: GenerateConfig<DateType>,
) {
  type DateRangePickerProps = RangePickerProps<DateType> & {
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName?: string;
    popupClassName?: string;
    rootClassName?: string;
    popupStyle?: React.CSSProperties;
  };

  const RangePicker = forwardRef<PickerRef, DateRangePickerProps>((props, ref) => {
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
      variant: customVariant,
      ...restProps
    } = props;

    const innerRef = React.useRef<PickerRef>(null);
    const { getPrefixCls, direction, getPopupContainer, rangePicker } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
    const { picker } = props;
    const rootPrefixCls = getPrefixCls();

    const [variant, enableVariantCls] = useVariant(customVariant, bordered);

    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    // const additionalOverrideProps: any = {
    //   ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
    //   ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
    // };

    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('DatePicker.RangePicker');

      warning.deprecated(!dropdownClassName, 'dropdownClassName', 'popupClassName');

      warning.deprecated(!('bordered' in props), 'bordered', 'variant');
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

    useImperativeHandle(ref, () => innerRef.current!);

    const [contextLocale] = useLocale('Calendar', enUS);

    const locale = { ...contextLocale, ...props.locale! };

    // ============================ zIndex ============================
    const [zIndex] = useZIndex('DatePicker', props.popupStyle?.zIndex as number);

    return wrapCSSVar(
      <RCRangePicker<DateType>
        separator={
          <span aria-label="to" className={`${prefixCls}-separator`}>
            <SwapRightOutlined />
          </span>
        }
        disabled={mergedDisabled}
        ref={innerRef}
        popupAlign={transPlacement2DropdownAlign(direction, placement)}
        placeholder={getRangePlaceholder(locale, picker, placeholder)}
        suffixIcon={suffixNode}
        prevIcon={<span className={`${prefixCls}-prev-icon`} />}
        nextIcon={<span className={`${prefixCls}-next-icon`} />}
        superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
        superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
        transitionName={`${rootPrefixCls}-slide-up`}
        {...restProps}
        // {...additionalOverrideProps}
        className={classNames(
          {
            [`${prefixCls}-${mergedSize}`]: mergedSize,
            [`${prefixCls}-${variant}`]: enableVariantCls,
          },
          getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback),
          hashId,
          compactItemClassnames,
          className,
          rangePicker?.className,
          cssVarCls,
          rootCls,
          rootClassName,
        )}
        style={{ ...rangePicker?.style, ...style }}
        locale={locale.lang}
        prefixCls={prefixCls}
        getPopupContainer={customGetPopupContainer || getPopupContainer}
        generateConfig={generateConfig}
        components={Components}
        direction={direction}
        classNames={{
          popup: classNames(
            hashId,
            popupClassName || dropdownClassName,
            cssVarCls,
            rootCls,
            rootClassName,
          ),
        }}
        styles={{
          popup: {
            ...props.popupStyle,
            zIndex,
          },
        }}
        allowClear={mergeAllowClear(allowClear, clearIcon, <CloseCircleFilled />)}
      />,
    );
  });

  if (process.env.NODE_ENV !== 'production') {
    RangePicker.displayName = 'RangePicker';
  }

  return RangePicker;
}
