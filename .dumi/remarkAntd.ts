import { unistUtilVisit } from 'dumi';

export default function remarkMeta() {
  return (tree, vFile) => {
    // read frontmatter
    unistUtilVisit.visit(tree, 'yaml', (node) => {
      try {
        if (!/(^|[\n\r])description:/.test(node.value)) {
          vFile.data.frontmatter.__autoDescription = true;
        }
      } catch {
        /* empty */
      }
    });
  };
}
