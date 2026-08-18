import * as React from 'react';
import type { CascaderProps as RcCascaderProps } from '@rc-component/cascader';
import { Panel } from '@rc-component/cascader';
import { clsx } from 'clsx';

import type { CascaderProps, DefaultOptionType, MultipleObject } from '.';
import { useComponentConfig } from '../config-provider/context';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { isPlainObject } from '../_util/is';
import useBase from './hooks/useBase';
import useCheckable from './hooks/useCheckable';
import useStyle from './style';
import usePanelStyle from './style/panel';
import useIcons from './hooks/useIcons';

type RcPanelProps = React.ComponentProps<typeof Panel>;
type RcPanelPickType = Extract<keyof RcPanelProps, keyof RcCascaderProps>;

export type PanelPickType =
  | Exclude<RcPanelPickType, 'checkable' | 'checkStrictly'>
  | 'multiple'
  | 'rootClassName';

export type CascaderPanelProps<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
  Multiple extends boolean = boolean,
> = Pick<CascaderProps<OptionType, ValueField, Multiple>, PanelPickType>;

export type CascaderPanelAutoProps<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
> =
  | (CascaderPanelProps<OptionType, ValueField> & { multiple?: false })
  | (CascaderPanelProps<OptionType, ValueField, true> & { multiple: true })
  | (Omit<CascaderPanelProps<OptionType, ValueField, true>, 'multiple'> & {
      multiple: MultipleObject;
    });

function CascaderPanel<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
>(props: CascaderPanelAutoProps<OptionType, ValueField>) {
  const {
    prefixCls: customizePrefixCls,
    className,
    multiple,
    rootClassName,
    notFoundContent,
    direction,
    expandIcon,
    loadingIcon,
    disabled: customDisabled,
  } = props;

  const { expandIcon: contextExpandIcon, loadingIcon: contextLoadingIcon } =
    useComponentConfig('cascader');

  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const [_, cascaderPrefixCls, mergedDirection, renderEmpty] = useBase(
    customizePrefixCls,
    direction,
  );

  const rootCls = useCSSVarCls(cascaderPrefixCls);
  const [hashId, cssVarCls] = useStyle(cascaderPrefixCls, rootCls);
  usePanelStyle(cascaderPrefixCls);

  const isRtl = mergedDirection === 'rtl';

  // ===================== Icon ======================
  const { expandIcon: mergedExpandIcon, loadingIcon: mergedLoadingIcon } = useIcons({
    contextExpandIcon,
    contextLoadingIcon,
    expandIcon,
    loadingIcon,
    isRtl,
  });

  // ===================== Empty =====================
  const mergedNotFoundContent = notFoundContent || renderEmpty?.('Cascader') || (
    <DefaultRenderEmpty componentName="Cascader" />
  );

  // =================== Multiple ====================
  const multipleObj = isPlainObject(multiple) ? (multiple as MultipleObject) : undefined;
  const mergedMultiple = !!multiple;
  const checkStrictly = multipleObj?.checkStrictly ?? false;

  const checkable = useCheckable(cascaderPrefixCls, mergedMultiple);

  // ==================== Render =====================

  return (
    <Panel
      {...(props as Pick<RcCascaderProps, RcPanelPickType>)}
      checkable={checkable}
      checkStrictly={checkStrictly || undefined}
      prefixCls={cascaderPrefixCls}
      className={clsx(className, hashId, rootClassName, cssVarCls, rootCls)}
      notFoundContent={mergedNotFoundContent}
      direction={mergedDirection}
      expandIcon={mergedExpandIcon}
      loadingIcon={mergedLoadingIcon}
      disabled={mergedDisabled}
    />
  );
}

export default CascaderPanel;
