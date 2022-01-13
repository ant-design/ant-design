import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

export interface EllipsisProps {
  enabledMeasure?: boolean;
  text?: React.ReactNode;
  width: number;
  rows: number;
  children: (cutChildren: React.ReactNode, needEllipsis: boolean) => React.ReactNode;
  onEllipsis: (isEllipsis: boolean) => void;
}

function cuttable(node: React.ReactElement) {
  const type = typeof node;
  return type === 'string' || type === 'number';
}

function getNodesLen(nodeList: React.ReactElement[]) {
  let totalLen = 0;

  nodeList.forEach(node => {
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

const Ellipsis = ({ enabledMeasure, children, text, width, rows, onEllipsis }: EllipsisProps) => {
  const [cutLength, setCutLength] = React.useState<[number, number, number]>([0, 0, 0]);
  const [walking, setWalking] = React.useState(false);
  const [startLen, midLen, endLen] = cutLength;

  const [singleRowHeight, setSingleRowHeight] = React.useState(0);

  const singleRowRef = React.useRef<HTMLSpanElement>(null);
  const midRowRef = React.useRef<HTMLSpanElement>(null);

  const nodeList = React.useMemo(() => toArray(text), [text]);
  const totalLen = React.useMemo(() => getNodesLen(nodeList), [nodeList]);

  const mergedChildren = React.useMemo(() => {
    if (!enabledMeasure) {
      return children(nodeList, false);
    }

    return children(sliceNodes(nodeList, midLen), midLen < totalLen);
  }, [enabledMeasure, children, nodeList, midLen, totalLen]);

  // ======================== Walk ========================
  React.useLayoutEffect(() => {
    if (enabledMeasure && width && totalLen) {
      setWalking(true);
      setCutLength([0, Math.ceil(totalLen / 2), totalLen]);
    }
  }, [enabledMeasure, width, text, totalLen, rows]);

  React.useLayoutEffect(() => {
    if (walking) {
      setSingleRowHeight(singleRowRef.current?.offsetHeight || 0);
    }
  }, [walking]);

  React.useLayoutEffect(() => {
    if (walking && singleRowHeight) {
      if (startLen !== endLen) {
        const midHeight = midRowRef.current?.offsetHeight || 0;
        const maxHeight = rows * singleRowHeight;

        let nextStartLen = startLen;
        let nextEndLen = endLen;

        // We reach the last round
        if (startLen === endLen - 1) {
          if (midHeight > maxHeight) {
            nextEndLen = startLen;
          } else {
            nextStartLen = endLen;
          }
        } else if (midHeight <= maxHeight) {
          nextStartLen = midLen;
        } else {
          nextEndLen = midLen;
        }

        const nextMidLen = Math.ceil((nextStartLen + nextEndLen) / 2);

        setCutLength([nextStartLen, nextMidLen, nextEndLen]);
      } else {
        setWalking(false);
        onEllipsis(midLen < totalLen);
      }
    }
  }, [walking, startLen, endLen, rows, singleRowHeight]);

  // ======================= Render =======================
  const renderMeasure = (
    content: React.ReactNode,
    ref: React.Ref<HTMLSpanElement>,
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
        zIndex: 9999,
        ...style,
      }}
    >
      {content}
    </span>
  );

  const renderMeasureSlice = (len: number, ref: React.Ref<HTMLSpanElement>) => {
    const sliceNodeList = sliceNodes(nodeList, len);

    return renderMeasure(children(sliceNodeList, true), ref, {
      width,
      whiteSpace: 'normal',
      margin: 0,
      padding: 0,
    });
  };

  return (
    <>
      {mergedChildren}
      {/* Measure usage */}
      {enabledMeasure && walking && (
        <>
          {/* `l` for top & `g` for bottom measure */}
          {renderMeasure('lg', singleRowRef, { width: 9999 })}
          {renderMeasureSlice(midLen, midRowRef)}
        </>
      )}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Ellipsis.displayName = 'Ellipsis';
}

export default Ellipsis;
