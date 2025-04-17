import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import { RangePicker as RCRangePicker } from '@rc-component/picker';
import type { PickerRef } from '@rc-component/picker';
import type { GenerateConfig } from '@rc-component/picker/lib/generate/index';
import cls from 'classnames';

import ContextIsolator from '../../_util/ContextIsolator';
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
import type { SemanticName } from '../../time-picker';
import useMergedPickerSemantic from '../hooks/useMergedPickerSemantic';
import enUS from '../locale/en_US';
import useStyle from '../style';
import { getRangePlaceholder, useIcons } from '../util';
import { TIME } from './constant';
import type { RangePickerProps } from './interface';
import useComponents from './useComponents';

const generateRangePicker = <DateType extends AnyObject = AnyObject>(
  generateConfig: GenerateConfig<DateType>,
) => {
  type DateRangePickerProps = Omit<RangePickerProps<DateType>, 'classNames' | 'styles'> & {
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  };

  const RangePicker = forwardRef<PickerRef, DateRangePickerProps>((props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      getPopupContainer: customGetPopupContainer,
      components,
      className,
      style,
      classNames,
      styles,
      placement,
      size: customizeSize,
      disabled: customDisabled,
      bordered = true,
      placeholder,
      status: customStatus,
      variant: customVariant,
      picker,
      rootClassName,
      popupClassName,
      popupStyle,
      ...restProps
    } = props;
    const consumerName = picker === TIME ? 'timePicker' : 'datePicker';
    // ====================== Warning =======================
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning(consumerName);
      [
        ['popupStyle', 'styles.popup'],
        ['popupClassName', 'classNames.popup'],
      ].forEach(([deprecatedName, newName]) => {
        warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
      });
    }
    const { mergedClassNames, mergedStyles } = useMergedPickerSemantic(
      consumerName,
      classNames,
      styles,
      rootClassName,
      popupClassName,
      popupStyle,
    );

    const innerRef = React.useRef<PickerRef>(null);
    const { getPrefixCls, direction, getPopupContainer, rangePicker } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
    const rootPrefixCls = getPrefixCls();

    const [variant, enableVariantCls] = useVariant('rangePicker', customVariant, bordered);

    const rootCls = useCSSVarCls(prefixCls);
    const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('DatePicker.RangePicker');

      warning.deprecated(!('bordered' in props), 'bordered', 'variant');
    }

    // ===================== Icon =====================
    const [mergedAllowClear] = useIcons(props, prefixCls);

    // ================== components ==================
    const mergedComponents = useComponents(components);

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
        {picker === TIME ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {hasFeedback && feedbackIcon}
      </>
    );

    useImperativeHandle(ref, () => innerRef.current!);

    const [contextLocale] = useLocale('Calendar', enUS);

    const locale = { ...contextLocale, ...props.locale! };

    // ============================ zIndex ============================
    const [zIndex] = useZIndex('DatePicker', mergedStyles?.popup?.zIndex as number);

    return (
      <ContextIsolator space>
        <RCRangePicker<DateType>
          separator={
            <span aria-label="to" className={`${prefixCls}-separator`}>
              <SwapRightOutlined />
            </span>
          }
          disabled={mergedDisabled}
          ref={innerRef as any} // Need to modify PickerRef
          placement={placement}
          placeholder={getRangePlaceholder(locale, picker, placeholder)}
          suffixIcon={suffixNode}
          prevIcon={<span className={`${prefixCls}-prev-icon`} />}
          nextIcon={<span className={`${prefixCls}-next-icon`} />}
          superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
          superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
          transitionName={`${rootPrefixCls}-slide-up`}
          picker={picker}
          {...restProps}
          className={cls(
            {
              [`${prefixCls}-${mergedSize}`]: mergedSize,
              [`${prefixCls}-${variant}`]: enableVariantCls,
            },
            getStatusClassNames(
              prefixCls,
              getMergedStatus(contextStatus, customStatus),
              hasFeedback,
            ),
            hashId,
            compactItemClassnames,
            className,
            rangePicker?.className,
            cssVarCls,
            rootCls,
            mergedClassNames?.root,
          )}
          style={{ ...mergedStyles?.root, ...rangePicker?.style, ...style }}
          locale={locale.lang}
          prefixCls={prefixCls}
          getPopupContainer={customGetPopupContainer || getPopupContainer}
          generateConfig={generateConfig}
          components={mergedComponents}
          direction={direction}
          classNames={{
            ...mergedClassNames,
            popup: cls(hashId, cssVarCls, rootCls, rootClassName, mergedClassNames?.popup),
          }}
          styles={{
            ...mergedStyles,
            popup: {
              ...mergedStyles?.popup,
              zIndex,
            },
          }}
          allowClear={mergedAllowClear}
        />
      </ContextIsolator>
    );
  });

  if (process.env.NODE_ENV !== 'production') {
    RangePicker.displayName = 'RangePicker';
  }

  return RangePicker;
};

export default generateRangePicker;
