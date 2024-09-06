/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { useEvent } from 'rc-util';

import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useItems from './hooks/useItems';
import useSizes from './hooks/useSizes';
import type { SplitterProps } from './interface';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';

const Splitter: React.FC<React.PropsWithChildren<SplitterProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = 'horizontal',
    children,
    rootClassName,
    onResizeStart,
    onResize,
    onResizeEnd,
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======================== Direct ========================
  const isVertical = layout === 'vertical';
  const isRTL = direction === 'rtl';
  const reverse = layout === 'horizontal' && isRTL;

  // ====================== Items Data ======================
  const items = useItems(children);

  // >>> Warning for uncontrolled
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Splitter');

    let existSize = false;
    let existUndefinedSize = false;

    items.forEach((item) => {
      if (item.size !== undefined) {
        existSize = true;
      } else {
        existUndefinedSize = true;
      }
    });

    if (existSize && existUndefinedSize && !onResize) {
      warning(
        false,
        'usage',
        'When part of `Splitter.Panel` has `size`, `onResize` is required or change `size` to `defaultSize`.',
      );
    }
  }

  // ====================== Container =======================
  const [containerSize, setContainerSize] = useState<number>(100);

  const onContainerResize: GetProp<typeof ResizeObserver, 'onResize'> = (size) => {
    setContainerSize(isVertical ? size.offsetHeight : size.offsetWidth);
  };

  // ========================= Size =========================
  const [itemPtgSizes, itemPxSizes, onOffsetStart, onOffsetUpdate, onCollapse] = useSizes(
    items,
    containerSize,
  );

  // ======================== Events ========================
  const onInternalResizeStart = useEvent(() => {
    onOffsetStart();
    onResizeStart?.(itemPxSizes);
  });

  const onInternalResizeUpdate = useEvent((index: number, offset: number) => {
    const nextSizes = onOffsetUpdate(index, offset);
    onResize?.(nextSizes);
  });

  const onInternalResizeEnd = useEvent(() => {
    onResizeEnd?.(itemPxSizes);
  });

  // ======================== Styles ========================
  const containerClassName = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
      [`${prefixCls}-rtl`]: isRTL,
    },
    rootClassName,
    cssVarCls,
    rootCls,
    hashId,
  );

  // ======================== Render ========================
  return wrapCSSVar(
    <ResizeObserver onResize={onContainerResize}>
      <div style={style} className={containerClassName}>
        {items.map((item, idx) => {
          const last = idx === items.length - 1;

          // Panel
          const panel = (
            <InternalPanel
              {...item}
              last={last}
              prefixCls={prefixCls}
              size={itemPtgSizes[idx] * 100}
            />
          );

          // Split Bar
          let splitBar: React.ReactElement | null = null;
          if (!last) {
            const nextItem = items[idx + 1];

            splitBar = (
              <SplitBar
                index={idx}
                prefixCls={prefixCls}
                vertical={isVertical}
                resizable={[item.resizable, nextItem.resizable]}
                collapsible={[item.collapsible.end, nextItem.collapsible.start]}
                size={[itemPxSizes[idx], itemPxSizes[idx + 1]]}
                sizeMin={[item.min, nextItem.min]}
                onOffsetStart={onInternalResizeStart}
                onOffsetUpdate={(index, offsetX, offsetY) => {
                  let offset = isVertical ? offsetY : offsetX;
                  if (reverse) {
                    offset = -offset;
                  }
                  onInternalResizeUpdate(index, offset);
                }}
                onOffsetEnd={onInternalResizeEnd}
                onCollapse={onCollapse}
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
      </div>
    </ResizeObserver>,
  );
};

export default Splitter;
