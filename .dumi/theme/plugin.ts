import fs from 'fs';
import type { IApi, IRoute } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import sylvanas from 'sylvanas';

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

      const codePath = opts.fileAbsPath!.replace(/\.\w+$/, '.tsx');
      const code = fs.existsSync(codePath) ? fs.readFileSync(codePath, 'utf-8') : '';

      props.jsx = sylvanas.parseText(code);

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

const resolve = (path: string): string => require.resolve(path);

const RoutesPlugin = (api: IApi) => {
  api.registerTechStack(() => new AntdReactTechStack());

  api.modifyRoutes(routes => {
    // TODO: append extra routes, such as home, changelog, form-v3

    const extraRoutesList: IRoute[] = [
      {
        id: 'changelog-cn',
        path: 'changelog-cn',
        absPath: '/changelog-cn',
        parentId: 'DocLayout',
        file: resolve('../../CHANGELOG.zh-CN.md'),
      },
      {
        id: 'changelog',
        path: 'changelog',
        absPath: '/changelog',
        parentId: 'DocLayout',
        file: resolve('../../CHANGELOG.en-US.md'),
      },
    ];

    extraRoutesList.forEach(itemRoute => {
      routes[itemRoute.path] = itemRoute;
    });

    return routes;
  });

  // exclude dynamic route path, to avoid deploy failed by `:id` directory
  api.modifyExportHTMLFiles(files => {
    return files.filter(f => !f.path.includes(':'));
  });
};

export default RoutesPlugin;
