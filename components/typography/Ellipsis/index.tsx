import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

export interface EllipsisProps {
  enabled?: boolean;
  text?: React.ReactNode;
  cssEllipsis: boolean;
  width: number;
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
    } else {
      currentNodeList.push(node);
    }

    currLen = nextLen;
  }

  return nodeList;
}

const Ellipsis = ({ enabled, cssEllipsis, children, text, width }: EllipsisProps) => {
  const [cutLength, setCutLength] = React.useState<[number, number]>([0, 0]);
  const [walking, setWalking] = React.useState(false);
  const [startLen, endLen] = cutLength;

  const nodeList = React.useMemo(() => toArray(text), [text]);
  const totalLen = React.useMemo(() => getNodesLen(nodeList), [nodeList]);

  React.useLayoutEffect(() => {
    setWalking(true);
    setCutLength([0, totalLen]);
  }, [text, totalLen]);

  React.useLayoutEffect(() => {
    if (cutLength !== endLen) {
    }
  }, [startLen, endLen]);

  // ======================= Render =======================
  const showChildren = children(text);

  const renderMeasure = (len: number) => (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        width,
        //  pointerEvents: 'none'
      }}
    >
      {children(sliceNodes(nodeList, len), {
        width,
        wordBreak: 'break-all',
        whiteSpace: 'normal',
      })}
    </div>
  );

  return (
    <>
      {showChildren}
      {/* Measure usage */}
      {enabled && !cssEllipsis && (
        <>
          {renderMeasure(startLen)}
          {renderMeasure(endLen)}
        </>
      )}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Ellipsis.displayName = 'Ellipsis';
}

export default Ellipsis;
