import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import createEmotionServer from '@emotion/server/create-instance';
import type { IApi } from 'dumi';

export const getHash = (str: string, length = 8) =>
  createHash('md5').update(str).digest('hex').slice(0, length);

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

export default async function buildAssetsPlugin(api: IApi) {
  const chalk = await import('chalk').then((m) => m.default);

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

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))
      .map((file) => {
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

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];

    return memo;
  });

  if (process.env.NODE_ENV === 'production') {
    // `addEntryImportsAhead` do not support compile,
    // so it will build file content directly without compile.
    // We add additional pre-site script for this,
    // but this will not affect normal developer usage.
    api.addEntryImportsAhead(() => ({
      source: path.join(api.paths.cwd, 'components', 'style', '~antd.layer.css'),
    }));
  }
}
