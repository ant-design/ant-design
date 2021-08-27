import * as React from 'react';
import classNames from 'classnames';
import RcCascader from 'rc-cascader';
import type { CascaderProps as RcCascaderProps } from 'rc-cascader';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RedoOutlined from '@ant-design/icons/RedoOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import getIcons from '../select/utils/iconUtil';
import { getTransitionName } from '../_util/motion';

export interface CascaderProps extends Omit<RcCascaderProps, 'checkable'> {
  multiple?: boolean;
  size?: SizeType;
  bordered?: boolean;
}

interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

const Cascader = React.forwardRef((props: CascaderProps, ref: React.Ref<CascaderRef>) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    className,
    multiple,
    bordered = true,
    transitionName,
    choiceTransitionName = '',
    dropdownClassName,
    expandIcon,
    ...restProps
  } = props;

  const {
    // getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    // renderEmpty,
    direction,
    // virtual,
    // dropdownMatchSelectWidth,
  } = React.useContext(ConfigContext);

  const isRtl = direction === 'rtl';

  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  // =================== Dropdown ====================
  const mergedDropdownClassName = classNames(dropdownClassName, `${cascaderPrefixCls}-dropdown`, {
    [`${cascaderPrefixCls}-dropdown-rtl`]: direction === 'rtl',
  });

  // ===================== Size ======================
  const size = React.useContext(SizeContext);
  const mergedSize = customizeSize || size;

  // ===================== Icon ======================
  let mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = isRtl ? <LeftOutlined /> : <RightOutlined />;
  }

  const loadingIcon = (
    <span className={`${prefixCls}-menu-item-loading-icon`}>
      <RedoOutlined spin />
    </span>
  );

  // =================== Multiple ====================
  const checkable = React.useMemo(
    () => (multiple ? <span className={`${prefixCls}-tree-checkbox-inner`} /> : false),
    [multiple],
  );

  // ===================== Icons =====================
  const { suffixIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple,
    prefixCls,
  });

  // ==================== Render =====================
  return (
    <RcCascader
      prefixCls={prefixCls}
      className={classNames(
        !customizePrefixCls && cascaderPrefixCls,
        {
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-borderless`]: !bordered,
        },
        className,
      )}
      {...(restProps as any)}
      expandIcon={mergedExpandIcon}
      inputIcon={suffixIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      loadingIcon={loadingIcon}
      checkable={checkable}
      dropdownClassName={mergedDropdownClassName}
      dropdownPrefixCls={customizePrefixCls || cascaderPrefixCls}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
      ref={ref}
    />
  );
});

Cascader.displayName = 'Cascader';

export default Cascader;
