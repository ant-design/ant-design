import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

interface MeasureTextProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

interface MeasureTextRef {
  isExceed: () => boolean;
  getHeight: () => number;
}

const MeasureText = React.forwardRef<MeasureTextRef, MeasureTextProps>(
  ({ style, children }, ref) => {
    const spanRef = React.useRef<HTMLSpanElement>(null);

    React.useImperativeHandle(ref, () => ({
      isExceed: () => {
        const span = spanRef.current!;
        return span.scrollHeight > span.clientHeight;
      },
      getHeight: () => spanRef.current!.clientHeight,
    }));

    return (
      <span
        aria-hidden
        ref={spanRef}
        style={{
          position: 'fixed',
          display: 'block',
          left: 0,
          top: 0,
          // zIndex: -9999,
          // visibility: 'hidden',
          pointerEvents: 'none',

          backgroundColor: 'rgba(255, 0, 0, 0.65)',

          ...style,
        }}
      >
        {children}
      </span>
    );
  },
);

function cuttable(node: React.ReactElement) {
  const type = typeof node;
  return type === 'string' || type === 'number';
}

function getNodesLen(nodeList: React.ReactElement[]) {
  let totalLen = 0;

  nodeList.forEach((node) => {
    if (cuttable(node)) {
      totalLen += String(node).length;
    } else {
      totalLen += 1;
    }
  });

  return totalLen;
}

function sliceNodes(nodeList: React.ReactElement[], len: number) {
  let currLen = 0;
  const currentNodeList: React.ReactNode[] = [];

  for (let i = 0; i < nodeList.length; i += 1) {
    // Match to return
    if (currLen === len) {
      return currentNodeList;
    }

    const node = nodeList[i];
    const canCut = cuttable(node);
    const nodeLen = canCut ? String(node).length : 1;
    const nextLen = currLen + nodeLen;

    // Exceed but current not which means we need cut this
    // This will not happen on validate ReactElement
    if (nextLen > len) {
      const restLen = len - currLen;
      currentNodeList.push(String(node).slice(0, restLen));
      return currentNodeList;
    }

    currentNodeList.push(node);
    currLen = nextLen;
  }

  return nodeList;
}

export interface EllipsisProps {
  enableMeasure?: boolean;
  text?: React.ReactNode;
  width: number;
  // fontSize: number;
  rows: number;
  children: (
    cutChildren: React.ReactNode[],
    /** Tell current `cutChildren` is in ellipsis */
    inEllipsis: boolean,
    /** Tell current `text` is exceed the `rows` which can be ellipsis */
    canEllipsis: boolean,
  ) => React.ReactNode;
  onEllipsis: (isEllipsis: boolean) => void;
  /**
   * Mark for misc update. Which will not affect ellipsis content length.
   * e.g. tooltip content update.
   */
  miscDeps: any[];
}

// Measure for the `text` is exceed the `rows` or not
const STATUS_MEASURE_NONE = 0;
const STATUS_MEASURE_START = 1;
const STATUS_MEASURE_NEED_ELLIPSIS = 2;
const STATUS_MEASURE_NO_NEED_ELLIPSIS = 3;

const lineClipStyle: React.CSSProperties = {
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
};

export default function EllipsisMeasure(props: EllipsisProps) {
  const { enableMeasure, width, text, children, rows, miscDeps, onEllipsis } = props;

  const nodeList = React.useMemo(() => toArray(text), [text]);
  const nodeLen = React.useMemo(() => getNodesLen(nodeList), [text]);

  // ========================= Full Content =========================
  const fullContent = React.useMemo(() => children(nodeList, false, false), [text]);

  // ========================= Cut Content ==========================
  const [ellipsisCutIndex, setEllipsisCutIndex] = React.useState<[number, number] | null>(null);
  const cutMidRef = React.useRef<MeasureTextRef>(null);

  // ========================= NeedEllipsis =========================
  const needEllipsisRef = React.useRef<MeasureTextRef>(null);

  // Measure for `rows-1` height, to avoid operation exceed the line height
  const descRowsEllipsisRef = React.useRef<MeasureTextRef>(null);
  const symbolRowEllipsisRef = React.useRef<MeasureTextRef>(null);

  const [needEllipsis, setNeedEllipsis] = React.useState(STATUS_MEASURE_NONE);
  const [ellipsisHeight, setEllipsisHeight] = React.useState(0);

  // Trigger start measure
  useLayoutEffect(() => {
    if (enableMeasure && width && nodeLen) {
      setNeedEllipsis(STATUS_MEASURE_START);
    } else {
      setNeedEllipsis(STATUS_MEASURE_NONE);
    }
  }, [width, text, rows, enableMeasure, nodeList]);

  // Measure process
  useLayoutEffect(() => {
    if (needEllipsis === STATUS_MEASURE_START) {
      const isOverflow = !!needEllipsisRef.current?.isExceed();

      setNeedEllipsis(isOverflow ? STATUS_MEASURE_NEED_ELLIPSIS : STATUS_MEASURE_NO_NEED_ELLIPSIS);
      setEllipsisCutIndex(isOverflow ? [0, nodeLen] : null);

      // Get the basic height of ellipsis rows
      const baseRowsEllipsisHeight = needEllipsisRef.current?.getHeight() || 0;

      // Get the height of `rows - 1` + symbol height
      const descRowsEllipsisHeight = rows === 1 ? 0 : descRowsEllipsisRef.current?.getHeight() || 0;
      const symbolRowEllipsisHeight = symbolRowEllipsisRef.current?.getHeight() || 0;
      const rowsWithEllipsisHeight = descRowsEllipsisHeight + symbolRowEllipsisHeight;

      const maxRowsHeight = Math.max(baseRowsEllipsisHeight, rowsWithEllipsisHeight);

      setEllipsisHeight(maxRowsHeight + 1);

      onEllipsis(isOverflow);
    }
  }, [needEllipsis]);

  // ========================= Cut Measure ==========================
  const cutMidIndex = ellipsisCutIndex
    ? Math.ceil((ellipsisCutIndex[0] + ellipsisCutIndex[1]) / 2)
    : 0;

  useLayoutEffect(() => {
    const [minIndex, maxIndex] = ellipsisCutIndex || [0, 0];
    if (minIndex !== maxIndex) {
      const midHeight = cutMidRef.current?.getHeight() || 0;

      const isOverflow = midHeight > ellipsisHeight;
      let targetMidIndex = cutMidIndex;

      if (maxIndex - minIndex === 1) {
        targetMidIndex = isOverflow ? minIndex : maxIndex;
      }

      if (isOverflow) {
        setEllipsisCutIndex([minIndex, targetMidIndex]);
      } else {
        setEllipsisCutIndex([targetMidIndex, maxIndex]);
      }
    }
  }, [ellipsisCutIndex, cutMidIndex]);

  // ========================= Text Content =========================
  const finalContent = React.useMemo(() => {
    if (
      needEllipsis !== STATUS_MEASURE_NEED_ELLIPSIS ||
      !ellipsisCutIndex ||
      ellipsisCutIndex[0] !== ellipsisCutIndex[1]
    ) {
      const content = children(nodeList, false, false);

      // Limit the max line count to avoid scrollbar blink
      // https://github.com/ant-design/ant-design/issues/42958
      if (
        needEllipsis !== STATUS_MEASURE_NO_NEED_ELLIPSIS &&
        needEllipsis !== STATUS_MEASURE_NONE
      ) {
        return (
          <span
            style={{
              ...lineClipStyle,
              WebkitLineClamp: rows,
            }}
          >
            {content}
          </span>
        );
      }

      return content;
    }

    return children(sliceNodes(nodeList, ellipsisCutIndex[0]), true, true);
  }, [needEllipsis, ellipsisCutIndex, nodeList, ...miscDeps]);

  // ============================ Render ============================
  const measureStyle: React.CSSProperties = {
    width,
    whiteSpace: 'normal',
    margin: 0,
    padding: 0,
  };

  return (
    <>
      {/* Final show content */}
      {finalContent}

      {/* Measure if current content is exceed the rows */}
      {needEllipsis === STATUS_MEASURE_START && (
        <>
          {/** With `rows` */}
          <MeasureText
            style={{
              ...measureStyle,
              ...lineClipStyle,
              WebkitLineClamp: rows,
            }}
            ref={needEllipsisRef}
          >
            {fullContent}
          </MeasureText>

          {/** With `rows - 1` */}
          <MeasureText
            style={{
              ...measureStyle,
              ...lineClipStyle,
              WebkitLineClamp: rows - 1,
            }}
            ref={descRowsEllipsisRef}
          >
            {fullContent}
          </MeasureText>

          {/** With `rows - 1` */}
          <MeasureText
            style={{
              ...measureStyle,
              ...lineClipStyle,
              WebkitLineClamp: 1,
            }}
            ref={symbolRowEllipsisRef}
          >
            {children([], true, true)}
          </MeasureText>
        </>
      )}

      {/* Real size overflow measure */}
      {needEllipsis === STATUS_MEASURE_NEED_ELLIPSIS &&
        ellipsisCutIndex &&
        ellipsisCutIndex[0] !== ellipsisCutIndex[1] && (
          <MeasureText
            style={{
              ...measureStyle,
              top: 400,
            }}
            ref={cutMidRef}
          >
            {children(sliceNodes(nodeList, cutMidIndex), true, true)}
          </MeasureText>
        )}
    </>
  );
}
