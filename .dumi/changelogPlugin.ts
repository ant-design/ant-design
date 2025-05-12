import type { IApi } from 'dumi';
import path from 'path';
import assert from 'assert';
import type { UnifiedTransformer } from 'dumi';
import { unistUtilVisit } from 'dumi';
import { t } from 'tar';

const COMPONENT_NAME = 'RefinedAntdChangelog';
const K = '$$-warp'

function remarkPlugin(): UnifiedTransformer<any> {
  return (tree, vFile) => {
    const { filename } = vFile.data.frontmatter as any;

    // only work on changelog files
    if (/^changelog\.\S+\.md$/i.test(filename)) {

      unistUtilVisit.visit(tree, 'heading', (node, idx, parent) => {
        if (node.depth !== 2) {
          return unistUtilVisit.CONTINUE;
        }

        const siblingNode = parent.children[idx! + 1];
        const nextSiblingNode = parent.children[idx! + 2];


        if (siblingNode?.type !== 'paragraph' || nextSiblingNode?.type !== 'list') {
          return unistUtilVisit.CONTINUE;
        }

        console.log('0'.repeat(100), {
          node,
        })

        const newHeadingNode = {
          type: 'element',
          tagName: 'div',
          properties: {
            [K]: `${COMPONENT_NAME}.Version`,
          },
          children: [node],
        };

        const newSiblingNode = {
          type: 'element',
          // tagName: `${COMPONENT_NAME}.Date`,
          tagName: 'div',
          properties: {
            [K]: `${COMPONENT_NAME}.Date`,
          },
          children: [siblingNode],
        };

        const newNextSiblingNode = {
          type: 'element',
          // tagName: `${COMPONENT_NAME}.Details`,
          tagName: 'div',
          properties: {
            [K]: `${COMPONENT_NAME}.Details`,
          },
          children: [nextSiblingNode],
        };

        const combinedNode = {
          type: 'element',
          // tagName: COMPONENT_NAME,
          tagName: 'div',
          properties: {
            [K]: COMPONENT_NAME,
            className: `abc`,
          },
          children: [newHeadingNode, newSiblingNode, newNextSiblingNode],
        }

        parent.children.splice(idx!, 3, combinedNode);
      });
    }
  }
}



function rehypePlugin(): UnifiedTransformer<any> {
  return (tree, vFile) => {
    const { filename } = vFile.data.frontmatter as any;

    if (/^changelog\.\S+\.md$/i.test(filename)) {
      unistUtilVisit.visit(tree, 'element', (node, idx, parent) => {
        // TODO: Should be deleted. assign: @Wuxh<wxh1220@gmail.com>
        globalThis.console.log('%c@Wuxh(Red)', 'color:red;', {
          value: 1014453,
          nodeT: node.tagName,
          node,
        })


        if (
          node.tagName === 'div' &&
          typeof node.properties?.[K] === 'string' &&
          node.properties[K].startsWith(COMPONENT_NAME)
        ) {

          // TODO: Should be deleted. assign: @Wuxh<wxh1220@gmail.com>
          globalThis.console.log('%c@Wuxh(Red)', 'color:red;', {
            value: 1014453 + '2',
            node
          })

          parent.children.replace(idx!, 1, {
            ...node,
            properties: {
              ...node.properties,
              className: `${node.properties.wrap}`.toLowerCase()
            }
          })
        }
      })
    }
  }
}

export default {
  remark: remarkPlugin,
  rehype: rehypePlugin,
};

