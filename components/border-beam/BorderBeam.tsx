import React from 'react';
import { useEvent } from '@rc-component/util';
import { getDOM } from '@rc-component/util/lib/Dom/findDOMNode';
import { composeRef, getNodeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { cloneElement } from '../_util/reactNode';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import { genCssVar } from '../theme/util/genStyleUtils';
import useBorderBeamEffect from './hooks/useBorderBeamEffect';
import useBorderBeamGeometry from './hooks/useBorderBeamGeometry';
import useBorderBeamInjection from './hooks/useBorderBeamInjection';
import useBorderBeamTarget from './hooks/useBorderBeamTarget';
import useStyle from './style';
import { getBorderBeamGradient, getMotionPathRadius } from './util';
import type { BorderBeamColor } from './util';

export type { BorderBeamColor, BorderBeamGradient } from './util';

export type BorderBeamSemanticType = {
  classNames?: {
    root?: string;
    beam?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    beam?: React.CSSProperties;
  };
};

export type BorderBeamSemanticAllType = GenerateSemantic<BorderBeamSemanticType, BorderBeamProps>;

export interface BorderBeamProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  classNames?: BorderBeamSemanticAllType['classNamesAndFn'];
  color?: BorderBeamColor;
  styles?: BorderBeamSemanticAllType['stylesAndFn'];
}

// 默认动画参数统一写入 CSS 变量，后续直插 / wrapper 两种模式都只消费同一组变量。
const DEFAULT_BEAM_DURATION = 6;
const DEFAULT_BEAM_DELAY = 0;
const DEFAULT_BEAM_OFFSET_START = 0;
const DEFAULT_BEAM_OFFSET_END = 100;
const DEFAULT_BEAM_SIZE = 100;
// 轨迹圆角略大于可视圆角，让流光经过拐角时更连续。
const DEFAULT_MOTION_PATH_RADIUS = 200;
// 光束头部略微前挂，尾部透明渐隐才能保持可见。
const DEFAULT_BEAM_ANCHOR = '90%';

// 只有使用者传入的 class/style 变化才需要触发几何重算；内部补的 position: relative
// 不参与 key，避免补丁自己造成无意义的重复测量。
const getStyleMeasureKey = (...styleList: Array<React.CSSProperties | undefined>) =>
  styleList
    .map((currentStyle) => {
      if (!currentStyle) {
        return '';
      }

      return Object.keys(currentStyle)
        .sort()
        .map(
          (styleName) =>
            `${styleName}:${String(currentStyle[styleName as keyof React.CSSProperties])}`,
        )
        .join(';');
    })
    .join('|');

const BorderBeam: React.FC<React.PropsWithChildren<BorderBeamProps>> = (props) => {
  const [, token] = useToken();
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    classNames,
    color,
    styles,
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('borderBeam');

  // ============================ Prefix ============================
  const prefixCls = getPrefixCls('border-beam', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [varName] = genCssVar(rootPrefixCls, 'border-beam');

  // ============================ BorderWidth ============================
  const mergedBorderWidth = token.BorderBeam?.borderBeamWidth ?? token.lineWidth;

  // ============================ Color ============================
  const fallbackStartColor = token.colorPrimary;
  const fallbackEndColor = token.colorPrimaryHover;
  const mergedBeamGradient = getBorderBeamGradient(color, fallbackStartColor, fallbackEndColor);

  // =========== Merged Props for Semantic ===========
  const mergedProps: BorderBeamProps = { ...props, color };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    { props: mergedProps },
  );

  const rootClsName = clsx(
    prefixCls,
    className,
    contextClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
  );
  const geometryMeasureKey = React.useMemo(
    () => `${rootClsName}|${getStyleMeasureKey(mergedStyles.root, contextStyle, style)}`,
    [contextStyle, mergedStyles.root, rootClsName, style],
  );

  // ============================ Host ============================
  // host 是真正承载 beam holder 的节点：直插时是 child DOM，wrapper 模式时是合成 div。
  // 这里用 state 而不是 ref，是为了在 ref 从“不可插入”切到“可插入”时触发 hooks 重新判断。
  const [hostElement, setHostElement] = React.useState<HTMLElement | null>(null);
  const setHostNode = useEvent((node: React.ReactInstance | HTMLElement | null) => {
    const nextHostElement = getDOM(node);
    const nextHTMLElement =
      typeof HTMLElement === 'undefined' || nextHostElement instanceof HTMLElement
        ? (nextHostElement as HTMLElement | null)
        : null;

    setHostElement((prevHostElement) =>
      /* istanbul ignore next -- repeated writes of the same DOM ref do not change any observable behavior */
      prevHostElement === nextHTMLElement ? prevHostElement : nextHTMLElement,
    );
  });

  const { canInjectIntoChild, canProbeChildRef, setProbeNode } = useBorderBeamInjection({
    prefixCls,
    validationStyleVar: varName('beam-size'),
    children,
    hostElement,
  });
  const { targetElement } = useBorderBeamTarget({
    prefixCls,
    children,
    hostElement,
    canInjectIntoChild,
  });
  const { beamVisible, needPositionPatch, positionResolved, trackRadius } = useBorderBeamGeometry({
    hostElement,
    targetElement,
    canInjectIntoChild,
    children,
    measureKey: geometryMeasureKey,
  });

  // ============================ Motion Path Radius ============================
  const motionPathRadius = getMotionPathRadius(trackRadius, DEFAULT_MOTION_PATH_RADIUS);

  // ============================ Styles ============================
  const getRootStyle = (
    originStyle?: React.CSSProperties,
    needPositionPatch?: boolean,
  ): React.CSSProperties => {
    const nextRootStyle: React.CSSProperties = {
      ...originStyle,
      [varName('beam-gradient')]: mergedBeamGradient, // 流光渐变色。
      [varName('beam-delay')]: `${DEFAULT_BEAM_DELAY}s`, // 动画延迟。
      [varName('beam-duration')]: `${DEFAULT_BEAM_DURATION}s`, // 一圈动画时长。
      [varName('beam-offset-end')]: `${DEFAULT_BEAM_OFFSET_END}%`, // 轨迹终点。
      [varName('beam-offset-start')]: `${DEFAULT_BEAM_OFFSET_START}%`, // 轨迹起点。
      [varName('beam-anchor')]: DEFAULT_BEAM_ANCHOR, // 光束挂载在轨迹上的锚点。
      [varName('beam-clip-radius')]: trackRadius, // 可视边框环圆角，来自计算后的 host/target。
      [varName('beam-path-radius')]: motionPathRadius, // 动画轨迹圆角，会对 px 值做内部平滑。
      [varName('beam-size')]: `${DEFAULT_BEAM_SIZE}px`, // 光束长度 / 尺寸。
      [varName('border-width')]: `${mergedBorderWidth}px`, // 边框环宽度。
      ...mergedStyles.root,
      ...contextStyle,
      ...style,
    };

    if (needPositionPatch) {
      // 只有计算样式仍是 static 时才覆盖定位；使用者传入 absolute/relative/sticky/fixed
      // 时保持原值，避免破坏布局。
      nextRootStyle.position = 'relative';
    }

    return nextRootStyle;
  };

  const beamStyle = React.useMemo(() => {
    const nextBeamStyle: React.CSSProperties = { ...mergedStyles.beam };

    if (!beamVisible || mergedBorderWidth <= 0) {
      nextBeamStyle.display = 'none';
    }

    return nextBeamStyle;
  }, [beamVisible, mergedBorderWidth, mergedStyles.beam]);

  const beamCls = clsx(`${prefixCls}-beam`, mergedClassNames.beam);

  const effectInfo = React.useMemo(
    () => ({ className: beamCls, style: beamStyle }),
    [beamCls, beamStyle],
  );

  useBorderBeamEffect({
    prefixCls,
    effectInfo,
    effectReady: canInjectIntoChild && positionResolved,
    hostElement: canInjectIntoChild ? hostElement : null,
  });

  // ============================ Render ============================
  if (!canInjectIntoChild) {
    // wrapper 模式下，如果 child 支持 ref，继续挂探针；这样异步 forwardRef 或 `as` 切换到
    // 可插入宿主后，组件能从 wrapper 回到直插模式。
    const wrappedChildren =
      canProbeChildRef && React.isValidElement(children)
        ? cloneElement(children, () => ({
            ref: composeRef(getNodeRef(children), setProbeNode),
          }))
        : children;

    return (
      <div
        ref={setHostNode}
        className={rootClsName}
        style={getRootStyle(undefined, needPositionPatch)}
      >
        {wrappedChildren}
        <div aria-hidden="true" className={beamCls} style={beamStyle} />
      </div>
    );
  }

  // 直插模式不改写 child.children，而是参考 wave：先把 className/style/ref 合到 child，
  // 再通过 layout effect 在真实 DOM 内插入 holder，兼容 antd 与三方 forwardRef 组件。
  const mergedChild = cloneElement(children, (originProps) => ({
    ref: composeRef(getNodeRef(children), setHostNode),
    className: clsx(originProps.className, rootClsName),
    style: getRootStyle(originProps.style, needPositionPatch),
  }));

  return mergedChild;
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
