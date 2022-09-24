import fs from 'fs';
import type { IApi } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';

/**
 * extends dumi internal tech stack, for customize previewer props
 */
class AntdReactTechStack extends ReactTechStack {
  // eslint-disable-next-line class-methods-use-this
  generatePreviewerProps(...[props, opts]: any) {
    if (opts.type === 'external') {
      // try to find md file with the same name as the demo tsx file
      const locale = opts.mdAbsPath.match(/index\.([a-z-]+)\.md$/i)?.[1];
      const mdPath = opts.fileAbsPath!.replace(/\.\w+$/, '.md');
      const md = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, 'utf-8') : '';

      if (md) {
        // extract description & css style from md file
        const description = md.match(
          new RegExp(`(?:^|\\n)## ${locale}([^]+?)(\\n## [a-z]|\\n\`\`\`|\\n<style>|$)`),
        )?.[1];
        const style = md.match(/\n```css\n([^]+?)\n```|\n<style>\n([^]+?)\n<\/style>/)?.[1];

        props.description ??= description?.trim();
        props.style ??= style;
      }
    }

    return props;
  }
}

export default (api: IApi) => {
  // @ts-ignore
  api.registerTechStack(() => new AntdReactTechStack());

  // api.modifyRoutes((routes) => {
  //   // TODO: append extra routes, such as home, changelog, form-v3
  //   return routes;
  // });
};
