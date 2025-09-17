/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ResizeObserver from '@rc-component/resize-observer';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import useOrientation from '../_util/hooks/useOrientation';
import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useItems from './hooks/useItems';
import useResizable from './hooks/useResizable';
import useResize from './hooks/useResize';
import useSizes from './hooks/useSizes';
import type { SplitterProps, SplitterSemanticDraggerClassNames } from './interface';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';

const Splitter: React.FC<React.PropsWithChildren<SplitterProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames,
    style,
    styles,
    layout,
    orientation,
    vertical,
    children,
    draggerIcon,
    collapsibleIcon,
    rootClassName,
    onResizeStart,
    onResize,
    onResizeEnd,
    lazy,
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('splitter');
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======================== Direct ========================
  const [mergedOrientation, isVertical] = useOrientation(orientation, vertical, layout);

  const isRTL = direction === 'rtl';
  const reverse = !isVertical && isRTL;

  // ====================== Items Data ======================
  const items = useItems(children);

  // >>> Warning for uncontrolled
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Splitter');

    const existSize = items.some((item) => item.size !== undefined);
    const existUndefinedSize = items.some((item) => item.size === undefined);

    if (existSize && existUndefinedSize && !onResize) {
      warning(
        false,
        'usage',
        'When part of `Splitter.Panel` has `size`, `onResize` is required or change `size` to `defaultSize`.',
      );
    }
    warning.deprecated(!layout, 'layout', 'orientation');
  }

  // ====================== Container =======================
  const [containerSize, setContainerSize] = useState<number | undefined>();

  const onContainerResize: GetProp<typeof ResizeObserver, 'onResize'> = (size) => {
    const { offsetWidth, offsetHeight } = size;
    const containerSize = isVertical ? offsetHeight : offsetWidth;
    // Skip when container has no size, Such as nested in a hidden tab panel
    // to fix: https://github.com/ant-design/ant-design/issues/51106
    if (containerSize === 0) {
      return;
    }
    setContainerSize(containerSize);
  };

  // ========================= Size =========================
  const [panelSizes, itemPxSizes, itemPtgSizes, itemPtgMinSizes, itemPtgMaxSizes, updateSizes] =
    useSizes(items, containerSize);

  // ====================== Resizable =======================
  const resizableInfos = useResizable(items, itemPxSizes, isRTL);

  const [onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, movingIndex] = useResize(
    items,
    resizableInfos,
    itemPtgSizes,
    containerSize,
    updateSizes,
    isRTL,
  );

  // ======================== Events ========================
  const onInternalResizeStart = useEvent((index: number) => {
    onOffsetStart(index);
    onResizeStart?.(itemPxSizes);
  });

  const onInternalResizeUpdate = useEvent((index: number, offset: number, lazyEnd?: boolean) => {
    const nextSizes = onOffsetUpdate(index, offset);

    if (lazyEnd) {
      onResizeEnd?.(nextSizes);
    } else {
      onResize?.(nextSizes);
    }
  });

  const onInternalResizeEnd = useEvent((lazyEnd?: boolean) => {
    onOffsetEnd();

    if (!lazyEnd) {
      onResizeEnd?.(itemPxSizes);
    }
  });

  const onInternalCollapse = useEvent((index: number, type: 'start' | 'end') => {
    const nextSizes = onCollapse(index, type);
    onResize?.(nextSizes);
    onResizeEnd?.(nextSizes);
  });

  // ======================== Styles ========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      // Convert `classNames.dragger: 'a'` to
      // `classNames.dragger: { default: 'a' }`
      dragger: {
        _default: 'default',
      },
    },
  );

  const containerClassName = cls(
    prefixCls,
    className,
    `${prefixCls}-${mergedOrientation}`,
    {
      [`${prefixCls}-rtl`]: isRTL,
    },
    rootClassName,
    mergedClassNames.root,
    contextClassName,
    cssVarCls,
    rootCls,
    hashId,
  );

  // ======================== Render ========================
  const maskCls = `${prefixCls}-mask`;

  const stackSizes = React.useMemo(() => {
    const mergedSizes: number[] = [];

    let stack = 0;
    for (let i = 0; i < items.length; i += 1) {
      stack += itemPtgSizes[i];
      mergedSizes.push(stack);
    }

    return mergedSizes;
  }, [itemPtgSizes]);

  const mergedStyle: React.CSSProperties = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  return (
    <ResizeObserver onResize={onContainerResize}>
      <div style={mergedStyle} className={containerClassName}>
        {items.map((item, idx) => {
          const panelProps = {
            ...item,
            className: cls(mergedClassNames.panel, item.className),
            style: { ...mergedStyles.panel, ...item.style },
          };

          // Panel
          const panel = (
            <InternalPanel {...panelProps} prefixCls={prefixCls} size={panelSizes[idx]} />
          );

          // Split Bar
          let splitBar: React.ReactElement | null = null;

          const resizableInfo = resizableInfos[idx];
          if (resizableInfo) {
            const ariaMinStart = (stackSizes[idx - 1] || 0) + itemPtgMinSizes[idx];
            const ariaMinEnd = (stackSizes[idx + 1] || 100) - itemPtgMaxSizes[idx + 1];

            const ariaMaxStart = (stackSizes[idx - 1] || 0) + itemPtgMaxSizes[idx];
            const ariaMaxEnd = (stackSizes[idx + 1] || 100) - itemPtgMinSizes[idx + 1];

            splitBar = (
              <SplitBar
                lazy={lazy}
                index={idx}
                active={movingIndex === idx}
                prefixCls={prefixCls}
                vertical={isVertical}
                resizable={resizableInfo.resizable}
                draggerStyle={mergedStyles.dragger}
                draggerClassName={mergedClassNames.dragger as SplitterSemanticDraggerClassNames}
                draggerIcon={draggerIcon}
                collapsibleIcon={collapsibleIcon}
                ariaNow={stackSizes[idx] * 100}
                ariaMin={Math.max(ariaMinStart, ariaMinEnd) * 100}
                ariaMax={Math.min(ariaMaxStart, ariaMaxEnd) * 100}
                startCollapsible={resizableInfo.startCollapsible}
                endCollapsible={resizableInfo.endCollapsible}
                showStartCollapsibleIcon={resizableInfo.showStartCollapsibleIcon}
                showEndCollapsibleIcon={resizableInfo.showEndCollapsibleIcon}
                onOffsetStart={onInternalResizeStart}
                onOffsetUpdate={(index, offsetX, offsetY, lazyEnd) => {
                  let offset = isVertical ? offsetY : offsetX;
                  if (reverse) {
                    offset = -offset;
                  }
                  onInternalResizeUpdate(index, offset, lazyEnd);
                }}
                onOffsetEnd={onInternalResizeEnd}
                onCollapse={onInternalCollapse}
                containerSize={containerSize || 0}
              />
            );
          }

          return (
            <React.Fragment key={`split-panel-${idx}`}>
              {panel}
              {splitBar}
            </React.Fragment>
          );
        })}

        {/* Fake mask for cursor */}
        {typeof movingIndex === 'number' && (
          <div aria-hidden className={cls(maskCls, `${maskCls}-${mergedOrientation}`)} />
        )}
      </div>
    </ResizeObserver>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Splitter.displayName = 'Splitter';
}

export default Splitter;
