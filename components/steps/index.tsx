import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import RcSteps from '@rc-component/steps';
import type { StepsProps as RcStepsProps } from '@rc-component/steps/lib/Steps';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { TARGET_CLS } from '../_util/wave/interface';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { genCssVar } from '../theme/util/genStyleUtils';
import Tooltip from '../tooltip';
import { InternalContext } from './context';
import PanelArrow from './PanelArrow';
import ProgressIcon from './ProgressIcon';
import useStyle from './style';

type RcIconRenderTypeInfo = Parameters<NonNullable<RcStepsProps['iconRender']>>[1];

export type IconRenderType = (
  oriNode: React.ReactNode,
  info: Pick<RcIconRenderTypeInfo, 'index' | 'active' | 'item' | 'components'>,
) => React.ReactNode;

export type StepsSemanticName = keyof StepsSemanticClassNames & keyof StepsSemanticStyles;

export type StepsSemanticClassNames = {
  root?: string;
  item?: string;
  itemWrapper?: string;
  itemIcon?: string;
  itemSection?: string;
  itemHeader?: string;
  itemTitle?: string;
  itemSubtitle?: string;
  itemContent?: string;
  itemRail?: string;
};

export type StepsSemanticStyles = {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  itemWrapper?: React.CSSProperties;
  itemIcon?: React.CSSProperties;
  itemSection?: React.CSSProperties;
  itemHeader?: React.CSSProperties;
  itemTitle?: React.CSSProperties;
  itemSubtitle?: React.CSSProperties;
  itemContent?: React.CSSProperties;
  itemRail?: React.CSSProperties;
};

export type StepsClassNamesType = SemanticClassNamesType<StepsProps, StepsSemanticClassNames>;

export type StepsStylesType = SemanticStylesType<StepsProps, StepsSemanticStyles>;

interface StepItem {
  className?: string;
  style?: React.CSSProperties;
  classNames?: GetProp<RcStepsProps, 'items'>[number]['classNames'];
  styles?: GetProp<RcStepsProps, 'items'>[number]['styles'];

  /** @deprecated Please use `content` instead */
  description?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
}

export type ProgressDotRender = (
  iconDot: React.ReactNode,
  info: {
    index: number;
    status: NonNullable<RcStepsProps['status']>;
    title: React.ReactNode;
    /** @deprecated Please use `content` instead. */
    description: React.ReactNode;
    content: React.ReactNode;
  },
) => React.ReactNode;

export interface BaseStepsProps {
  // Style
  className?: string;
  rootClassName?: string;
  classNames?: StepsClassNamesType;
  styles?: StepsStylesType;
  variant?: 'filled' | 'outlined';
  size?: 'default' | 'small';

  // Layout
  type?: 'default' | 'navigation' | 'inline' | 'panel' | 'dot';
  /** @deprecated Please use `orientation` instead. */
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
  /** @deprecated Please use `titlePlacement` instead. */
  labelPlacement?: 'horizontal' | 'vertical';
  titlePlacement?: 'horizontal' | 'vertical';
  /** @deprecated Please use `type` and `iconRender` instead. */
  progressDot?: boolean | ProgressDotRender;
  responsive?: boolean;
  ellipsis?: boolean;
  /**
   * Set offset cell, only work when `type` is `inline`.
   */
  offset?: number;

  // Data
  current?: number;
  initial?: number;
  items?: StepItem[];
  percent?: number;
  status?: 'wait' | 'process' | 'finish' | 'error';

  // Render
  iconRender?: IconRenderType;

  // Events
  onChange?: (current: number) => void;
}

export interface StepsProps extends BaseStepsProps {
  prefixCls?: string;
  style?: React.CSSProperties;
}

const waveEffectClassNames: StepsProps['classNames'] = {
  itemIcon: TARGET_CLS,
};

const Steps = (props: StepsProps) => {
  const {
    // Style
    size,
    className,
    rootClassName,
    style,
    variant = 'filled',
    type,
    classNames,
    styles,

    // Layout
    direction,
    orientation,
    responsive = true,
    progressDot,
    labelPlacement,
    titlePlacement,
    ellipsis,
    offset = 0,

    // Data
    items,
    percent,
    current = 0,
    onChange,

    // Render
    iconRender,

    // MISC
    ...restProps
  } = props;

  const internalContent = React.useContext(InternalContext);

  const contextContent = useComponentConfig('steps');

  const {
    getPrefixCls,
    direction: rtlDirection,
    className: contextClassName,
    style: contextStyle,
  } = contextContent;

  let contextClassNames: StepsProps['classNames'];
  let contextStyles: StepsProps['styles'];
  let components: RcStepsProps['components'] = {};

  if (internalContent) {
    components = { root: internalContent.rootComponent, item: internalContent.itemComponent };
  } else {
    ({ classNames: contextClassNames, styles: contextStyles } = contextContent);
  }

  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('steps', props.prefixCls);
  const itemIconCls = `${prefixCls}-item-icon`;

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const [varName] = genCssVar(rootPrefixCls, 'cmp-steps');

  // ============================= Size =============================
  const mergedSize = useSize(size);

  // ============================= Item =============================
  const mergedItems = React.useMemo(() => (items || []).filter(Boolean), [items]);

  // ============================ Layout ============================
  const { xs } = useBreakpoint(responsive);

  // Type
  const mergedType = React.useMemo(() => {
    if (type && type !== 'default') {
      return type;
    }

    if (progressDot) {
      return 'dot';
    }

    return type;
  }, [progressDot, type]);

  const isInline = mergedType === 'inline';
  const isDot = mergedType === 'dot' || mergedType === 'inline';

  // Progress Dot Render function
  const legacyProgressDotRender = React.useMemo(() => {
    return mergedType === 'dot' && typeof progressDot === 'function' ? progressDot : undefined;
  }, [mergedType, progressDot]);

  const mergedOrientation = React.useMemo<StepsProps['orientation']>(() => {
    const nextOrientation = orientation || direction;

    if (mergedType === 'panel') {
      return 'horizontal';
    }

    return (responsive && xs) || nextOrientation === 'vertical' ? 'vertical' : 'horizontal';
  }, [orientation, direction, mergedType, responsive, xs]);

  const mergedTitlePlacement = React.useMemo<StepsProps['titlePlacement']>(() => {
    if (isDot || mergedOrientation === 'vertical') {
      return mergedOrientation === 'vertical' ? 'horizontal' : 'vertical';
    }
    if (type === 'navigation') {
      return 'horizontal';
    }

    return titlePlacement || labelPlacement || 'horizontal';
  }, [isDot, labelPlacement, mergedOrientation, titlePlacement, type]);

  // ========================== Percentage ==========================
  const mergedPercent = isInline ? undefined : percent;

  // =========== Merged Props for Semantic ===========
  const mergedProps: StepsProps = {
    ...props,
    variant,
    size: mergedSize,
    type: mergedType,
    orientation: mergedOrientation,
    titlePlacement: mergedTitlePlacement,
    current,
    percent: mergedPercent,
    responsive,
    offset,
  };

  // ============================ Styles ============================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    StepsClassNamesType,
    StepsStylesType,
    StepsProps
  >([waveEffectClassNames, contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  // ============================= Icon =============================
  const internalIconRender: RcStepsProps['iconRender'] = (_, info) => {
    const {
      item,
      index,
      active,
      components: { Icon: StepIcon },
    } = info;

    const { status, icon } = item;

    let iconContent: React.ReactNode = null;

    if (isDot || icon) {
      iconContent = icon;
    } else {
      switch (status) {
        case 'finish':
          iconContent = <CheckOutlined className={`${itemIconCls}-finish`} />;
          break;
        case 'error':
          iconContent = <CloseOutlined className={`${itemIconCls}-error`} />;
          break;
        default: {
          let numNode = <span className={`${itemIconCls}-number`}>{info.index + 1}</span>;

          if (status === 'process' && mergedPercent !== undefined) {
            numNode = (
              <ProgressIcon
                prefixCls={prefixCls}
                rootPrefixCls={rootPrefixCls}
                percent={mergedPercent}
              >
                {numNode}
              </ProgressIcon>
            );
          }

          iconContent = numNode;
        }
      }
    }

    let iconNode: React.ReactNode = <StepIcon>{iconContent}</StepIcon>;

    // Custom Render Props
    if (iconRender) {
      iconNode = iconRender(iconNode, {
        index,
        active,
        item,
        components: { Icon: StepIcon },
      });
    } else if (typeof legacyProgressDotRender === 'function') {
      iconNode = legacyProgressDotRender(iconNode, {
        index,
        ...(item as Required<typeof item>),
      });
    }

    return iconNode;
  };

  // ============================ Custom ============================
  const itemRender: RcStepsProps['itemRender'] = (itemNode, itemInfo) => {
    let content = itemNode;

    if (isInline && itemInfo.item.content) {
      content = (
        <Tooltip destroyOnHidden title={itemInfo.item.content}>
          {itemNode}
        </Tooltip>
      );
    }

    return (
      <Wave
        component="Steps"
        disabled={itemInfo.item.disabled || !onChange}
        colorSource={variant === 'filled' ? 'color' : null}
      >
        {content}
      </Wave>
    );
  };

  const itemWrapperRender: RcStepsProps['itemWrapperRender'] =
    mergedType === 'panel'
      ? (itemNode) => {
          return (
            <>
              {itemNode}
              <PanelArrow prefixCls={prefixCls} />
            </>
          );
        }
      : undefined;

  // ============================ Styles ============================
  const mergedStyle: React.CSSProperties = {
    [varName('items-offset')]: `${offset}`,
    ...contextStyle,
    ...style,
  };

  const stepsClassName = clsx(
    contextClassName,
    `${prefixCls}-${variant}`,
    {
      [`${prefixCls}-${mergedType}`]: mergedType !== 'dot' ? mergedType : false,
      [`${prefixCls}-rtl`]: rtlDirection === 'rtl',
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-ellipsis`]: ellipsis,
      [`${prefixCls}-with-progress`]: mergedPercent !== undefined,
      [`${prefixCls}-${mergedSize}`]: mergedSize,
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  // =========================== Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Steps');

    warning.deprecated(!labelPlacement, 'labelPlacement', 'titlePlacement');
    warning.deprecated(!progressDot, 'progressDot', 'type="dot"');
    warning.deprecated(!direction, 'direction', 'orientation');
    warning.deprecated(
      mergedItems.every((item) => !item.description),
      'items.description',
      'items.content',
    );
  }

  // ============================ Render ============================
  return (
    <RcSteps
      {...restProps}
      // Style
      prefixCls={prefixCls}
      className={stepsClassName}
      style={mergedStyle}
      classNames={mergedClassNames}
      styles={mergedStyles}
      // Layout
      orientation={mergedOrientation}
      titlePlacement={mergedTitlePlacement}
      components={components}
      // Data
      current={current}
      items={mergedItems}
      onChange={onChange}
      // Render
      iconRender={internalIconRender}
      itemRender={itemRender}
      itemWrapperRender={itemWrapperRender}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Steps.displayName = 'Steps';
}

export default Steps;
