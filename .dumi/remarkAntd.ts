import { unistUtilVisit } from 'dumi';
import yaml from 'js-yaml';

export default function remarkMeta() {
  return (tree, vFile) => {
    // read frontmatter
    unistUtilVisit.visit(tree, 'yaml', (node) => {
      try {
        const frontmatter = yaml.load(node.value) as any;
        if (!('description' in frontmatter)) {
          frontmatter.__autoDescription = true;
        }
        Object.assign(vFile.data.frontmatter!, frontmatter);
      } catch {
        /* empty */
      }
    });
  };
}
