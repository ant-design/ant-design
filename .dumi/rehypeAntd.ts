import assert from 'assert';
import { type HastRoot, type UnifiedTransformer, unistUtilVisit } from 'dumi';

/**
 * plugin for modify hast tree when docs compiling
 */
function rehypeAntd(): UnifiedTransformer<HastRoot> {
  return (tree, vFile) => {
    unistUtilVisit.visit(tree, 'element', node => {
      if (node.tagName === 'DumiDemoGrid') {
        // replace DumiDemoGrid to DemoWrapper, to implement demo toolbar
        node.tagName = 'DemoWrapper';
      } else if (node.tagName === 'ResourceCards') {
        const propNames = ['title', 'cover', 'description', 'src', 'official'];
        const contentNode = node.children[0];

        assert(
          contentNode.type === 'text',
          `ResourceCards content must be plain text!\nat ${
            (vFile.data.frontmatter as any).filename
          }`,
        );

        // clear children
        node.children = [];

        // generate JSX props
        (node as any).JSXAttributes = [
          {
            type: 'JSXAttribute',
            name: 'resources',
            value: JSON.stringify(
              contentNode.value
                .trim()
                .split('\n')
                .reduce<any>((acc, cur) => {
                  // match text from `  - 桌面组件 Sketch 模板包`
                  const [, isProp, val] = cur.match(/(\s+)?-\s(.+)/)!;

                  if (!isProp) {
                    // create items when match title
                    acc.push({ [propNames[0]]: val });
                  } else {
                    // add props when match others
                    const prev = acc[acc.length - 1];

                    prev[propNames[Object.keys(prev).length]] = val;
                  }

                  return acc;
                }, []),
            ),
          },
        ];
      }
    });
  };
}

export default rehypeAntd;
