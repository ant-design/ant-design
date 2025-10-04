import type { UnifiedTransformer } from 'dumi';
import { unistUtilVisit } from 'dumi';
import set from 'lodash/set';

let hastToString: typeof import('hast-util-to-string').toString;

// workaround to import pure esm module
(async () => {
  ({ toString: hastToString } = await import('hast-util-to-string'));
})();

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

    unistUtilVisit.visit(tree, 'element', (node, idx, parent) => {
      if (node.properties?.[WRAPPER_FLAG]) {
        return unistUtilVisit.SKIP;
      }
      if (
        idx !== undefined &&
        parent &&
        idx! + 2 < parent.children.length &&
        node.tagName === 'h2' &&
        parent.children[idx! + 1].tagName === 'p' &&
        parent.children[idx! + 2].tagName === 'ul'
      ) {
        nodesToWrap.push({ parent, startIdx: idx! });
      }
    });

    nodesToWrap.reverse().forEach(({ parent, startIdx }) => {
      const [heading, date, list] = parent.children.splice(startIdx, 3);

      const version = hastToString(heading);
      const dateStr = hastToString(date);

      const headingWrap = {
        type: 'element',
        tagName: `${COMPONENT_NAME}.Version`,
        // 为标签添加语义化 className (下面同理)
        children: [set(heading, 'properties.className', 'changelog-version')],
      };

      const dateWrap = {
        type: 'element',
        tagName: `${COMPONENT_NAME}.Date`,
        children: [set(date, 'properties.className', 'changelog-date')],
      };

      const listWrap = {
        type: 'element',
        tagName: `${COMPONENT_NAME}.Details`,
        children: [set(list, 'properties.className', 'changelog-details')],
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
        children: [headingWrap, dateWrap, listWrap],
      };

      parent.children.splice(startIdx, 0, wrapper);
    });
  };
}

export default rehypeChangelog;
