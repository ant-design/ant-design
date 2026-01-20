import * as React from 'react';
import type { CascaderProps as RcCascaderProps } from '@rc-component/cascader';
import { Panel } from '@rc-component/cascader';
import type { PickType } from '@rc-component/cascader/lib/Panel';
import { clsx } from 'clsx';

import type { CascaderProps, DefaultOptionType } from '.';
import { useComponentConfig } from '../config-provider/context';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useBase from './hooks/useBase';
import useCheckable from './hooks/useCheckable';
import useStyle from './style';
import usePanelStyle from './style/panel';
import { getIcons } from './utils';

export type PanelPickType = Exclude<PickType, 'checkable'> | 'multiple' | 'rootClassName';

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
  | (CascaderPanelProps<OptionType, ValueField, true> & { multiple: true });

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

  const [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty] = useBase(
    customizePrefixCls,
    direction,
  );

  const rootCls = useCSSVarCls(cascaderPrefixCls);
  const [hashId, cssVarCls] = useStyle(cascaderPrefixCls, rootCls);
  usePanelStyle(cascaderPrefixCls);

  const isRtl = mergedDirection === 'rtl';

  // ===================== Icon ======================
  const { expandIcon: mergedExpandIcon, loadingIcon: mergedLoadingIcon } = getIcons({
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
  const checkable = useCheckable(cascaderPrefixCls, multiple);

  // ==================== Render =====================

  return (
    <Panel
      {...(props as Pick<RcCascaderProps, PickType>)}
      checkable={checkable}
      prefixCls={cascaderPrefixCls}
      className={clsx(className, hashId, rootClassName, cssVarCls, rootCls)}
      notFoundContent={mergedNotFoundContent}
      direction={mergedDirection}
      expandIcon={mergedExpandIcon}
      loadingIcon={
        <span className={`${prefixCls}-menu-item-loading-icon`}>{mergedLoadingIcon}</span>
      }
      disabled={mergedDisabled}
    />
  );
}

export default CascaderPanel;
