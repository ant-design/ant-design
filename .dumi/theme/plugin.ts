import { extractStyle } from '@ant-design/cssinjs';
import type { IApi, IRoute } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import fs from 'fs';
import sylvanas from 'sylvanas';
import localPackage from '../../package.json';

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
      const pkgDependencyList = localPackage.dependencies;

      props.pkgDependencyList = pkgDependencyList;
      props.jsx = sylvanas.parseText(code);

      if (md) {
        // extract description & css style from md file
        const description = md.match(
          new RegExp(`(?:^|\\n)## ${locale}([^]+?)(\\n## [a-z]|\\n\`\`\`|\\n<style>|$)`),
        )?.[1];
        const style = md.match(/\r?\n(?:```css|<style>)\r?\n([^]+?)\r?\n(?:```|<\/style>)/)?.[1];

        props.description ??= description?.trim();
        props.style ??= style;
      }
    }

    return props;
  }
}

const resolve = (path: string): string => require.resolve(path);

const RoutesPlugin = (api: IApi) => {
  const ssrCssFileName = `ssr-${Date.now()}.css`;

  api.registerTechStack(() => new AntdReactTechStack());

  api.modifyRoutes((routes) => {
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

    extraRoutesList.forEach((itemRoute) => {
      routes[itemRoute.path] = itemRoute;
    });

    return routes;
  });

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))
      // FIXME: workaround to make emotion support react 18 pipeableStream
      // ref: https://github.com/emotion-js/emotion/issues/2800#issuecomment-1221296308
      .map((file) => {
        let styles = '';

        // extract all emotion style tags from body
        file.content = file.content.replace(/<style data-emotion[\S\s]+?<\/style>/g, (s) => {
          styles += s;

          return '';
        });

        // insert emotion style tags to head
        file.content = file.content.replace('</head>', `${styles}</head>`);

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];
    memo.styles.push(`/${ssrCssFileName}`);

    return memo;
  });

  // generate ssr css file
  api.onBuildHtmlComplete(() => {
    // FIXME: This should not be empty @peachScript
    const styleCache = (global as any)?.styleCache;
    const styleText = styleCache ? extractStyle(styleCache) : '';
    const styleTextWithoutStyleTag = styleText
      .replace(/<style\s[^>]*>/g, '')
      .replace(/<\/style>/g, '');

    fs.writeFileSync(`./_site/${ssrCssFileName}`, styleTextWithoutStyleTag, 'utf8');
  });
};

export default RoutesPlugin;
