import { unistUtilVisit } from 'dumi';
import type { UnifiedTransformer } from 'dumi';

function remarkMeta(): UnifiedTransformer<any> {
  return (tree, vFile) => {
    // read frontmatter
    unistUtilVisit.visit(tree, 'yaml', (node) => {
      if (!/(^|[\n\r])description:/.test(node.value)) {
        (vFile.data.frontmatter as any).__autoDescription = true;
      }
    });
  };
}

export default remarkMeta;
