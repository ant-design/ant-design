import { useMemo } from 'react';

import type { BehaviorMapItem } from './BehaviorMap';

const generateMermaidCode = (root: BehaviorMapItem) => {
  const lines: string[] = [];

  lines.push('graph LR');

  lines.push(`classDef baseNode fill:#fff,stroke:none,stroke-width:0px,rx:5,ry:5,font-size:14px`);

  const traverse = (node: BehaviorMapItem, parentId?: string) => {
    const safeId = `node_${node.id.replace(/[^a-z0-9]/gi, '_')}`;
    let labelText = node.label.replace(/"/g, "'");

    if (!parentId) {
      lines.push(`style ${safeId} font-size:16px`);
      labelText = `**${labelText}**`;
    } else if (node.targetType === 'mvp') {
      const blueDot = `<span style="display:inline-block;width:8px;height:8px;background-color:rgb(22, 119, 255);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>`;
      labelText = `${blueDot}${labelText}`;
    } else if (node.targetType === 'extension') {
      const grayDot = `<span style="display:inline-block;width:8px;height:8px;background-color:rgb(160, 160, 160);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>`;
      labelText = `${grayDot}${labelText}`;
    }
    lines.push(`${safeId}["${labelText}"]:::baseNode`);

    if (node.link) {
      lines.push(`click ${safeId} "#${node.link}"`);
    }

    if (parentId) {
      lines.push(`${parentId} --> ${safeId}`);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child, safeId));
    }
  };
  traverse(root);
  return lines.join('\n');
};

export const useMermaidCode = (data: BehaviorMapItem) => {
  return useMemo(() => generateMermaidCode(data), [data]);
};
