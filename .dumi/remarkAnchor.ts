import { unistUtilVisit } from 'dumi';
import type { UnifiedTransformer } from 'dumi';

let toSlug: typeof import('github-slugger').slug;

// workaround to import pure esm module
(async () => {
  ({ slug: toSlug } = await import('github-slugger'));
})();

const isNil = (value: any) => value == null;

const toArr = <T>(value: T | T[]) => {
  if (isNil(value)) return [];
  return Array.isArray(value) ? value : [value];
};

const patch = (context: Record<string, any>, key: string, value: any) => {
  if (!context[key]) {
    context[key] = value;
  }
  return context[key];
};

interface Options {
  level?: number;
}

const remarkAnchor = (opt: Options = {}): UnifiedTransformer<any> => {
  // https://regex101.com/r/WDjkK0/1
  const RE = /\s*\{#([^}]+)\}$/;

  const realOpt = {
    level: [1, 2, 3, 4, 5, 6],
    ...opt,
  };

  return function transformer(tree) {
    const ids = new Set();

    unistUtilVisit.visit(tree, 'heading', (node) => {
      if (toArr(realOpt.level).indexOf(node.depth) === -1) {
        return unistUtilVisit.CONTINUE;
      }

      const lastChild = node.children.at(-1);

      if (lastChild?.type === 'text') {
        const text = lastChild.value;
        const match = text.match(RE);
        if (match) {
          const id = match[1];
          if (id !== toSlug(id)) {
            throw new Error(
              `Expected header ID to be a valid slug. You specified: {#${id}}. Replace it with: {#${toSlug(id)}}`,
            );
          }

          node.data ??= {};
          node.data.hProperties = { ...node.data.hProperties, id };

          lastChild.value = text.replace(RE, '');

          if (lastChild.value === '') {
            node.children.pop();
          }
          if (ids.has(id)) {
            throw new Error(`Cannot have a duplicate header with id "${id}" on the page.
              Rename the section or give it an explicit unique ID. For example: #### Arguments {#setstate-arguments}`);
          }

          ids.add(id);

          const data = patch(node, 'data', {});
          patch(data, 'id', id);
          patch(data, 'htmlAttributes', {});
          patch(data, 'hProperties', {});
          patch(data.htmlAttributes, 'id', id);
          patch(data.hProperties, 'id', id);
        }
      }
    });
  };
};

export default remarkAnchor;
