import yaml from 'js-yaml';

let visit: typeof import('unist-util-visit').visit;

// workaround to import pure esm module
(async () => {
  ({ visit } = await import('unist-util-visit'));
})();

export default function remarkMeta() {
  return (tree, vFile) => {
    // read frontmatter
    visit(tree, 'yaml', (node) => {
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
