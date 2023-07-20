import { extractStyle } from '@ant-design/cssinjs';
import type { IApi, IRoute } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import sylvanas from 'sylvanas';
import { extractStaticStyle } from 'antd-style';
import { createHash } from 'crypto';
import localPackage from '../../package.json';

export const getHash = (str: string, length = 8) =>
  createHash('md5').update(str).digest('hex').slice(0, length);

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

const resolve = (p: string): string => require.resolve(p);

const RoutesPlugin = (api: IApi) => {
  const ssrCssFileName = `ssr-${Date.now()}.css`;

  const writeCSSFile = (key: string, hashKey: string, cssString: string) => {
    const fileName = `emotion-${key}.${getHash(hashKey)}.css`;

    const filePath = path.join(api.paths.absOutputPath, fileName);

    if (!fs.existsSync(filePath)) {
      api.logger.event(chalk.grey(`write to: ${filePath}`));
      fs.writeFileSync(filePath, cssString, 'utf8');
    }

    return fileName;
  };

  const addLinkStyle = (html: string, cssFile: string) => {
    const prefix = api.userConfig.publicPath || api.config.publicPath;
    return html.replace('</head>', `<link rel="stylesheet" href="${prefix + cssFile}"></head>`);
  };

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
      .map((file) => {
        let globalStyles = '';

        // extract all emotion style tags from body
        file.content = file.content.replace(/<style data-emotion[\S\s]+?<\/style>/g, (s) => {
          globalStyles += s;

          return '';
        });

        // insert emotion style tags to head
        file.content = file.content.replace('</head>', `${globalStyles}</head>`);

        // 1. 提取 antd-style 样式
        const styles = extractStaticStyle(file.content, { includeAntd: false });

        // 2. 提取每个样式到独立 css 文件
        styles.forEach((result) => {
          api.logger.event(
            `${chalk.yellow(file.path)} include ${chalk.blue`[${result.key}]`} ${chalk.yellow(
              result.ids.length,
            )} styles`,
          );

          const cssFile = writeCSSFile(result.key, result.ids.join(''), result.css);

          file.content = addLinkStyle(file.content, cssFile);
        });

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
