import type { UnifiedTransformer } from 'dumi';
import { unistUtilVisit } from 'dumi';
import set from 'lodash/set';
import semver from 'semver';

let hastToString: typeof import('hast-util-to-string').toString;

// workaround to import pure esm module
(async () => {
  ({ toString: hastToString } = await import('hast-util-to-string'));
})();

function isValidStrictVer(ver: string): boolean {
  if (!semver.valid(ver)) {
    return false;
  }

  const parts = ver.split('.');
  if (parts.length !== 3) {
    return false;
  }

  return parts.every((part) => /^\d+$/.test(part));
}

function isValidDate(dateStr: string): boolean {
  // (YYYY-MM-DD)
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

const COMPONENT_NAME = 'RefinedChangelog';

function rehypeChangelog(): UnifiedTransformer<any> {
  return (tree, vFile) => {
    const { filename } = vFile.data.frontmatter as any;

    // 只处理 changelog 文件
    if (!/^changelog\.\S+\.md$/i.test(filename)) {
      return;
    }

    const nodesToWrap: { parent: any; startIdx: number }[] = [];
    const WRAPPER_FLAG = 'data-changelog-wrapped'; // 包裹容器唯一标识

    function checkLogSegment(node: any, strict = true) {
      if (node && node.type === 'element' && node.tagName === 'h2') {
        if (strict) {
          const ver = hastToString(node);
          return isValidStrictVer(ver) && semver.major(ver) >= 5;
        }
        return true;
      }
      return false;
    }

    unistUtilVisit.visit(tree, 'element', (node, idx, parent) => {
      if (node.properties?.[WRAPPER_FLAG]) {
        return unistUtilVisit.SKIP;
      }

      if (idx !== undefined && parent && checkLogSegment(node)) {
        nodesToWrap.push({ parent, startIdx: idx! });
      }
    });

    const totalNodesToWrap = nodesToWrap.length;
    for (let i = totalNodesToWrap - 1; i >= 0; i--) {
      const { parent, startIdx } = nodesToWrap[i];

      let endIdx = -1;
      const isEndOfWrap = i === totalNodesToWrap - 1;
      for (let j = startIdx + 1; j < parent.children.length; j++) {
        const nextNode = parent.children[j];
        if (
          (isEndOfWrap && checkLogSegment(nextNode, false)) || // 日志页通常还存在历史 major 版本
          nextNode.properties?.[WRAPPER_FLAG] || // 已经被处理
          checkLogSegment(nextNode) // 下一段日志
        ) {
          endIdx = j;
          break;
        }
      }
      if (endIdx === -1) {
        continue;
      }

      // Version
      const heading = parent.children[startIdx];

      // Find Date
      let dateIdx = -1;
      for (let j = startIdx + 1; j < endIdx; j++) {
        const node = parent.children[j];
        if (node.type === 'element' && isValidDate(hastToString(node))) {
          dateIdx = j;
          break;
        }
      }
      if (dateIdx === -1) {
        continue;
      }

      // Collect list nodes between dateIdx and endIdx
      const version = hastToString(heading);
      const date = parent.children[dateIdx];
      const dateStr = hastToString(date);
      const details = parent.children.slice(dateIdx + 1, endIdx);

      const headingWrap = {
        type: 'element',
        tagName: `${COMPONENT_NAME}.Version`,
        children: [set(heading, 'properties.className', 'changelog-version')],
      };

      const dateWrap = {
        type: 'element',
        tagName: `${COMPONENT_NAME}.Date`,
        children: [set(date, 'properties.className', 'changelog-date')],
      };

      const detailWrap = {
        type: 'element',
        tagName: `${COMPONENT_NAME}.Details`,
        properties: {
          className: 'changelog-details',
        },
        children: details,
      };

      const wrapper = {
        type: 'element',
        tagName: COMPONENT_NAME,
        properties: {
          [WRAPPER_FLAG]: true,
        },
        JSXAttributes: [
          {
            type: 'JSXAttribute',
            name: 'version',
            value: JSON.stringify(version),
          },
          {
            type: 'JSXAttribute',
            name: 'date',
            value: JSON.stringify(dateStr),
          },
        ],
        children: [headingWrap, dateWrap, detailWrap],
      };

      parent.children.splice(startIdx, endIdx - startIdx, wrapper);
    }
  };
}

export default rehypeChangelog;
