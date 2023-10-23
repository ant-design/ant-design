import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import type { IApi, IRoute } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import chalk from 'chalk';
import sylvanas from 'sylvanas';
import createEmotionServer from '@emotion/server/create-instance';
import localPackage from '../../package.json';

function extractEmotionStyle(html: string) {
  // copy from emotion ssr
  // https://github.com/vercel/next.js/blob/deprecated-main/examples/with-emotion-vanilla/pages/_document.js
  const styles = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map((cache) => {
    const result = createEmotionServer(cache).extractCritical(html);
    if (!result.css) return null;

    const { css, ids } = result;

    return {
      key: cache.key,
      css,
      ids,
      tag: `<style data-emotion="${cache.key} ${result.ids.join(' ')}">${result.css}</style>`,
    };
  });
  return styles.filter(Boolean);
}

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

      props.pkgDependencyList = {
        ...localPackage.devDependencies,
        ...localPackage.dependencies,
      };
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
  // const ssrCssFileName = `ssr-${Date.now()}.css`;

  const writeCSSFile = (key: string, hashKey: string, cssString: string) => {
    const fileName = `style-${key}.${getHash(hashKey)}.css`;

    const filePath = path.join(api.paths.absOutputPath, fileName);

    if (!fs.existsSync(filePath)) {
      api.logger.event(chalk.grey(`write to: ${filePath}`));
      fs.writeFileSync(filePath, cssString, 'utf8');
    }

    return fileName;
  };

  const addLinkStyle = (html: string, cssFile: string, prepend = false) => {
    const prefix = api.userConfig.publicPath || api.config.publicPath;

    if (prepend) {
      return html.replace('<head>', `<head><link rel="stylesheet" href="${prefix + cssFile}">`);
    }

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

        // Debug for file content: uncomment this if need check raw out
        // const tmpFileName = `_${file.path.replace(/\//g, '-')}`;
        // const tmpFilePath = path.join(api.paths.absOutputPath, tmpFileName);
        // fs.writeFileSync(tmpFilePath, file.content, 'utf8');

        // extract all emotion style tags from body
        file.content = file.content.replace(
          /<style (data-emotion|data-sandpack)[\S\s]+?<\/style>/g,
          (s) => {
            globalStyles += s;

            return '';
          },
        );

        // insert emotion style tags to head
        file.content = file.content.replace('</head>', `${globalStyles}</head>`);

        // 1. 提取 antd-style 样式
        const styles = extractEmotionStyle(file.content);

        // 2. 提取每个样式到独立 css 文件
        styles.forEach((result) => {
          api.logger.event(
            `${chalk.yellow(file.path)} include ${chalk.blue`[${result!.key}]`} ${chalk.yellow(
              result!.ids.length,
            )} styles`,
          );

          const cssFile = writeCSSFile(result!.key, result!.ids.join(''), result!.css);

          file.content = addLinkStyle(file.content, cssFile);
        });

        // Insert antd style to head
        const matchRegex = /<style data-type="antd-cssinjs">(.*?)<\/style>/;
        const matchList = file.content.match(matchRegex) || [];

        let antdStyle = '';

        matchList.forEach((text) => {
          file.content = file.content.replace(text, '');
          antdStyle += text.replace(matchRegex, '$1');
        });

        const cssFile = writeCSSFile('antd', antdStyle, antdStyle);
        file.content = addLinkStyle(file.content, cssFile, true);

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];
    // memo.styles.push(`/${ssrCssFileName}`);

    return memo;
  });

  // zombieJ: Unique CSS file is large, we move to build css for each page.
  // See the `modifyExportHTMLFiles` above.

  // generate ssr css file
  // api.onBuildHtmlComplete(() => {
  //   const styleCache = (global as any)?.styleCache;
  //   const styleText = styleCache ? extractStyle(styleCache) : '';
  //   const styleTextWithoutStyleTag = styleText
  //     .replace(/<style\s[^>]*>/g, '')
  //     .replace(/<\/style>/g, '');

  //   fs.writeFileSync(`./_site/${ssrCssFileName}`, styleTextWithoutStyleTag, 'utf8');
  // });
};

export default RoutesPlugin;
