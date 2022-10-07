import { type HastRoot, type UnifiedTransformer, unistUtilVisit } from 'dumi';

/**
 * plugin for modify hast tree when docs compiling
 */
function rehypeAntd(): UnifiedTransformer<HastRoot> {
  return tree => {
    unistUtilVisit.visit(tree, 'element', node => {
      if (node.tagName === 'DumiDemoGrid') {
        // replace DumiDemoGrid to DemoWrapper, to implement demo toolbar
        node.tagName = 'DemoWrapper';
      }
    });
  };
}

export default rehypeAntd;
