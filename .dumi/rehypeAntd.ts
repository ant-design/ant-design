import assert from 'assert';
import type { HastRoot, UnifiedTransformer } from 'dumi';
import { unistUtilVisit } from 'dumi';

/**
 * plugin for modify hast tree when docs compiling
 */
function rehypeAntd(): UnifiedTransformer<HastRoot> {
  return (tree, vFile) => {
    const { filename } = vFile.data.frontmatter as any;

    unistUtilVisit.visit(tree, 'element', (node, i, parent) => {
      if (node.tagName === 'DumiDemoGrid') {
        // replace DumiDemoGrid to DemoWrapper, to implement demo toolbar
        node.tagName = 'DemoWrapper';
      } else if (node.tagName === 'ResourceCards') {
        const propNames = ['title', 'cover', 'description', 'src', 'official'];
        const contentNode = node.children[0];

        assert(
          contentNode.type === 'text',
          `ResourceCards content must be plain text!\nat ${filename}`,
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
      } else if (
        node.type === 'element' &&
        node.tagName === 'Table' &&
        /^components/.test(filename)
      ) {
        if (!node.properties) return;
        node.properties.className ??= [];
        (node.properties.className as string[]).push('component-api-table');
      } else if (node.type === 'element' && (node.tagName === 'Link' || node.tagName === 'a')) {
        const { tagName } = node;
        node.properties!.sourceType = tagName;
        node.tagName = 'LocaleLink';
      } else if (node.type === 'element' && node.tagName === 'video') {
        node.tagName = 'VideoPlayer';
      } else if (node.tagName === 'SourceCode') {
        const { lang } = node.properties!;

        if (typeof lang === 'string' && lang.startsWith('sandpack')) {
          const code = (node.children[0] as any).value as string;
          const configRegx = /^const sandpackConfig = ([\S\s]*?});/;
          const [configString] = code.match(configRegx) || [];
          /* biome-ignore lint/security/noGlobalEval: used in documentation */ /* eslint-disable-next-line no-eval */
          const config = configString && eval(`(${configString.replace(configRegx, '$1')})`);
          Object.keys(config || {}).forEach((key) => {
            if (typeof config[key] === 'object') {
              config[key] = JSON.stringify(config[key]);
            }
          });

          parent!.children.splice(i!, 1, {
            type: 'element',
            tagName: 'Sandpack',
            properties: {
              ...config,
            },
            children: [
              {
                type: 'text',
                value: code.replace(configRegx, '').trim(),
              },
            ],
          });
        }
      }
    });
  };
}

export default rehypeAntd;
