import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

interface MeasureTextProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const MeasureText = React.forwardRef<HTMLSpanElement, MeasureTextProps>(
  ({ style, children }, ref) => (
    <span
      aria-hidden
      ref={ref}
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
  ),
);

export interface EllipsisProps {
  enabledMeasure?: boolean;
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
}

const STATUS_MEASURE_NONE = 0;
const STATUS_MEASURE_START = 1;
const STATUS_MEASURE_NEED_ELLIPSIS = 2;
const STATUS_MEASURE_NO_NEED_ELLIPSIS = 3;

export default function EllipsisMeasure(props: EllipsisProps) {
  const { enabledMeasure, width, text, children, rows } = props;

  // console.log('Props:', props);

  const nodeList = React.useMemo(() => toArray(text), [text]);

  // ========================= Full Content =========================
  const fullContent = React.useMemo(() => children(nodeList, false, false), [text]);

  // ========================= NeedEllipsis =========================
  const needEllipsisRef = React.useRef<HTMLSpanElement>(null);
  const [needEllipsis, setNeedEllipsis] = React.useState(STATUS_MEASURE_NONE);

  // Trigger start measure
  useLayoutEffect(() => {
    if (enabledMeasure && width && nodeList.length) {
      setNeedEllipsis(STATUS_MEASURE_START);
    } else {
      setNeedEllipsis(STATUS_MEASURE_NONE);
    }
  }, [width, text, rows, enabledMeasure]);

  // Measure process
  useLayoutEffect(() => {
    if (needEllipsis === STATUS_MEASURE_START) {
      const measureEle = needEllipsisRef.current!;
      const isOverflow = measureEle.scrollHeight > measureEle.clientHeight;

      setNeedEllipsis(isOverflow ? STATUS_MEASURE_NEED_ELLIPSIS : STATUS_MEASURE_NO_NEED_ELLIPSIS);
    }
  }, [needEllipsis]);

  // ============================ Render ============================
  const measureStyle: React.CSSProperties = {
    width,
    whiteSpace: 'normal',
    margin: 0,
    padding: 0,
  };

  const mergedChildren = needEllipsis === STATUS_MEASURE_NONE ? fullContent : 'none';

  return (
    <>
      {mergedChildren}
      {needEllipsis === STATUS_MEASURE_START && (
        <MeasureText
          style={{
            ...measureStyle,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: rows,
            WebkitBoxOrient: 'vertical',
          }}
          ref={needEllipsisRef}
        >
          {fullContent}
        </MeasureText>
      )}
    </>
  );
}
