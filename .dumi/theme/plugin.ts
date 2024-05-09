import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import createEmotionServer from '@emotion/server/create-instance';
import chalk from 'chalk';
import type { IApi, IRoute } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import sylvanas from 'sylvanas';

import { dependencies, devDependencies } from '../../package.json';

function extractEmotionStyle(html: string) {
  // copy from emotion ssr
  // https://github.com/vercel/next.js/blob/deprecated-main/examples/with-emotion-vanilla/pages/_document.js
  const styles = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map((cache) => {
    const result = createEmotionServer(cache).extractCritical(html);
    if (!result.css) {
      return null;
    }

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

      props.pkgDependencyList = { ...devDependencies, ...dependencies };
      props.jsx = sylvanas.parseText(code);

      if (md) {
        // extract description & css style from md file
        const blocks: Record<string, string> = {};

        const lines = md.split('\n');

        let blockName = '';
        let cacheList: string[] = [];

        // Get block name
        const getBlockName = (text: string) => {
          if (text.startsWith('## ')) {
            return text.replace('## ', '').trim();
          }

          if (text.startsWith('```css') || text.startsWith('<style>')) {
            return 'style';
          }

          return null;
        };

        // Fill block content
        const fillBlock = (name: string, lineList: string[]) => {
          if (lineList.length) {
            let fullText: string;

            if (name === 'style') {
              fullText = lineList
                .join('\n')
                .replace(/<\/?style>/g, '')
                .replace(/```(\s*css)/g, '');
            } else {
              fullText = lineList.slice(1).join('\n');
            }

            blocks[name] = fullText;
          }
        };

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Mark as new block
          const nextBlockName = getBlockName(line);
          if (nextBlockName) {
            fillBlock(blockName, cacheList);

            // Next Block
            blockName = nextBlockName;
            cacheList = [line];
          } else {
            cacheList.push(line);
          }
        }

        // Last block
        fillBlock(blockName, cacheList);

        props.description = blocks[locale];
        props.style = blocks.style;
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
        const matchRegex = /<style data-type="antd-cssinjs">([\S\s]+?)<\/style>/;
        const matchList = file.content.match(matchRegex) || [];

        // Init to order the `@layer`
        let antdStyle = '@layer global, antd;';

        matchList.forEach((text) => {
          file.content = file.content.replace(text, '');
          antdStyle += text.replace(matchRegex, '$1');
        });

        const cssFile = writeCSSFile('antd', antdStyle, antdStyle);
        file.content = addLinkStyle(file.content, cssFile, true);

        // Insert antd cssVar to head
        const cssVarMatchRegex = /<style data-type="antd-css-var"[\S\s]+?<\/style>/;
        const cssVarMatchList = file.content.match(cssVarMatchRegex) || [];

        cssVarMatchList.forEach((text) => {
          file.content = file.content.replace(text, '');
          file.content = file.content.replace('<head>', `<head>${text}`);
        });

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];
    // memo.styles.push(`/${ssrCssFileName}`);

    return memo;
  });
};

export default RoutesPlugin;
