import toArray from 'rc-util/lib/Children/toArray';
import useIsomorphicLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import * as React from 'react';

export interface EllipsisProps {
  enabledMeasure?: boolean;
  text?: React.ReactNode;
  width: number;
  fontSize: number;
  rows: number;
  children: (cutChildren: React.ReactNode[], needEllipsis: boolean) => React.ReactNode;
  onEllipsis: (isEllipsis: boolean) => void;
}

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

const NONE = 0;
const PREPARE = 1;
const WALKING = 2;
const DONE_WITH_ELLIPSIS = 3;
const DONE_WITHOUT_ELLIPSIS = 4;

type WalkingState =
  | typeof NONE
  | typeof PREPARE
  | typeof WALKING
  | typeof DONE_WITH_ELLIPSIS
  | typeof DONE_WITHOUT_ELLIPSIS;

const Ellipsis = ({
  enabledMeasure,
  children,
  text,
  width,
  fontSize,
  rows,
  onEllipsis,
}: EllipsisProps) => {
  const [[startLen, midLen, endLen], setCutLength] = React.useState<
    [startLen: number, midLen: number, endLen: number]
  >([0, 0, 0]);
  const [walkingState, setWalkingState] = React.useState<WalkingState>(NONE);

  const [singleRowHeight, setSingleRowHeight] = React.useState(0);

  const singleRowRef = React.useRef<HTMLElement>(null);
  const midRowRef = React.useRef<HTMLElement>(null);

  const nodeList = React.useMemo(() => toArray(text), [text]);
  const totalLen = React.useMemo(() => getNodesLen(nodeList), [nodeList]);

  const mergedChildren = React.useMemo(() => {
    if (!enabledMeasure || walkingState !== DONE_WITH_ELLIPSIS) {
      return children(nodeList, false);
    }

    return children(sliceNodes(nodeList, midLen), midLen < totalLen);
  }, [enabledMeasure, walkingState, children, nodeList, midLen, totalLen]);

  // ======================== Walk ========================
  useIsomorphicLayoutEffect(() => {
    if (enabledMeasure && width && fontSize && totalLen) {
      setWalkingState(PREPARE);
      setCutLength([0, Math.ceil(totalLen / 2), totalLen]);
    }
  }, [enabledMeasure, width, fontSize, text, totalLen, rows]);

  useIsomorphicLayoutEffect(() => {
    if (walkingState === PREPARE) {
      setSingleRowHeight(singleRowRef.current?.offsetHeight || 0);
    }
  }, [walkingState]);

  useIsomorphicLayoutEffect(() => {
    if (singleRowHeight) {
      if (walkingState === PREPARE) {
        // Ignore if position is enough
        const midHeight = midRowRef.current?.offsetHeight || 0;
        const maxHeight = rows * singleRowHeight;

        if (midHeight <= maxHeight) {
          setWalkingState(DONE_WITHOUT_ELLIPSIS);
          onEllipsis(false);
        } else {
          setWalkingState(WALKING);
        }
      } else if (walkingState === WALKING) {
        if (startLen !== endLen) {
          const midHeight = midRowRef.current?.offsetHeight || 0;
          const maxHeight = rows * singleRowHeight;

          let nextStartLen = startLen;
          let nextEndLen = endLen;

          // We reach the last round
          if (startLen === endLen - 1) {
            nextEndLen = startLen;
          } else if (midHeight <= maxHeight) {
            nextStartLen = midLen;
          } else {
            nextEndLen = midLen;
          }

          const nextMidLen = Math.ceil((nextStartLen + nextEndLen) / 2);

          setCutLength([nextStartLen, nextMidLen, nextEndLen]);
        } else {
          setWalkingState(DONE_WITH_ELLIPSIS);
          onEllipsis(true);
        }
      }
    }
  }, [walkingState, startLen, endLen, rows, singleRowHeight]);

  // ======================= Render =======================
  const measureStyle: React.CSSProperties = {
    width,
    whiteSpace: 'normal',
    margin: 0,
    padding: 0,
  };

  const renderMeasure = (
    content: React.ReactNode,
    ref: React.Ref<HTMLElement>,
    style: React.CSSProperties,
  ) => (
    <span
      aria-hidden
      ref={ref}
      style={{
        position: 'fixed',
        display: 'block',
        left: 0,
        top: 0,
        zIndex: -9999,
        visibility: 'hidden',
        pointerEvents: 'none',
        fontSize: Math.floor(fontSize / 2) * 2,
        ...style,
      }}
    >
      {content}
    </span>
  );

  const renderMeasureSlice = (len: number, ref: React.Ref<HTMLElement>) => {
    const sliceNodeList = sliceNodes(nodeList, len);

    return renderMeasure(children(sliceNodeList, true), ref, measureStyle);
  };

  return (
    <>
      {mergedChildren}
      {/* Measure usage */}
      {enabledMeasure &&
        walkingState !== DONE_WITH_ELLIPSIS &&
        walkingState !== DONE_WITHOUT_ELLIPSIS && (
          <>
            {/* `l` for top & `g` for bottom measure */}
            {renderMeasure('lg', singleRowRef, { wordBreak: 'keep-all', whiteSpace: 'nowrap' })}
            {/* {renderMeasureSlice(midLen, midRowRef)} */}
            {walkingState === PREPARE
              ? renderMeasure(children(nodeList, false), midRowRef, measureStyle)
              : renderMeasureSlice(midLen, midRowRef)}
          </>
        )}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Ellipsis.displayName = 'Ellipsis';
}

export default Ellipsis;
