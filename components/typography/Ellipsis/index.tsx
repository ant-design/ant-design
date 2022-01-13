import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

export interface EllipsisProps {
  enabledMeasure?: boolean;
  text?: React.ReactNode;
  width: number;
  rows: number;
  children: (cutChildren: React.ReactNode, measureStyle?: React.CSSProperties) => React.ReactNode;
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

const Ellipsis = ({ enabledMeasure, children, text, width, rows }: EllipsisProps) => {
  const [cutLength, setCutLength] = React.useState<[number, number, number]>([0, 0, 0]);
  const [walking, setWalking] = React.useState(false);
  const [startLen, midLen, endLen] = cutLength;

  const [singleRowHeight, setSingleRowHeight] = React.useState(0);

  const singleRowRef = React.useRef<HTMLSpanElement>(null);
  const startRowRef = React.useRef<HTMLSpanElement>(null);
  const midRowRef = React.useRef<HTMLSpanElement>(null);
  const endRowRef = React.useRef<HTMLSpanElement>(null);

  const nodeList = React.useMemo(() => toArray(text), [text]);
  const totalLen = React.useMemo(() => getNodesLen(nodeList), [nodeList]);

  // ======================== Walk ========================
  React.useLayoutEffect(() => {
    if (enabledMeasure && width && totalLen) {
      setWalking(true);
      setCutLength([0, Math.ceil(totalLen / 2), totalLen]);
      setSingleRowHeight(singleRowRef.current?.offsetHeight || 0);
    }
  }, [enabledMeasure, width, text, totalLen]);

  React.useLayoutEffect(() => {
    if (walking && startLen !== endLen) {
      // const startHeight = startRowRef.current?.offsetHeight || 0;
      const midHeight = midRowRef.current?.offsetHeight || 0;
      // const endHeight = endRowRef.current?.offsetHeight || 0;
      const maxHeight = rows * singleRowHeight;

      let nextStartLen = startLen;
      let nextEndLen = endLen;

      // if (startHeight <= maxHeight && maxHeight <= midHeight) {
      //   nextEndLen = midLen;
      // } else {
      //   nextStartLen = midLen;
      // }
      if (midHeight <= maxHeight) {
        nextStartLen = midLen;
      } else {
        nextEndLen = midLen;
      }

      const nextMidLen = Math.floor((nextStartLen + nextEndLen) / 2);

      console.log(nextStartLen, nextMidLen, nextEndLen);

      setCutLength([nextStartLen, nextMidLen, nextEndLen]);
    }
  }, [walking, startLen, endLen, rows, singleRowHeight]);

  // ======================= Render =======================
  const showChildren = children(text);

  const renderMeasure = (
    key: React.Key,
    content: React.ReactNode,
    ref: React.Ref<HTMLSpanElement>,
    style: React.CSSProperties,
  ) => (
    <span
      aria-hidden
      key={key}
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

  // Make sure we can reuse render but not conflict with keys
  const keys: Record<number, boolean> = {};
  const getKey = (len: number, fallbackKey: string) => {
    if (!keys[len]) {
      keys[len] = true;
      return len;
    }

    return fallbackKey;
  };

  const renderMeasureSlice = (key: string, len: number, ref: React.Ref<HTMLSpanElement>) => {
    const sliceNodeList = sliceNodes(nodeList, len);

    return renderMeasure(getKey(len, key), children(sliceNodeList, {}), ref, {
      width,
      whiteSpace: 'normal',
      wordBreak: 'break-all',
      margin: 0,
      padding: 0,
    });
  };

  return (
    <>
      {showChildren}
      {/* Measure usage */}
      {enabledMeasure && walking && (
        <>
          {/* `l` for top & `g` for bottom measure */}
          {renderMeasure('base', 'lg', singleRowRef, { width: 9999 })}
          {/* {renderMeasureSlice('start', startLen, startRowRef)} */}
          {renderMeasureSlice('mid', midLen, midRowRef)}
          {/* {renderMeasureSlice('end', endLen, endRowRef)} */}
        </>
      )}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Ellipsis.displayName = 'Ellipsis';
}

export default Ellipsis;
