/* eslint-disable compat/compat */
/* eslint-disable no-console, no-await-in-loop, import/no-extraneous-dependencies, lodash/import-scope, no-restricted-syntax */
import path from 'path';
import fs from 'fs';
import os from 'os';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import minimist from 'minimist';
import tar from 'tar';
import fse from 'fs-extra';
import chalk from 'chalk';
import _ from 'lodash';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';
import { assert } from 'console';

const ALI_OSS_BUCKET = 'antd-visual-diff';

const compareScreenshots = async (
  baseImgPath: string,
  currentImgPath: string,
  diffImagePath: string,
): Promise<number> => {
  const baseImgBuf = await sharp(baseImgPath).toBuffer();
  const currentImgBuf = await sharp(currentImgPath).toBuffer();

  const basePng = PNG.sync.read(baseImgBuf);
  const targetWidth = basePng.width;
  const targetHeight = basePng.height;

  const comparePng = PNG.sync.read(
    await sharp(currentImgBuf)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer(),
  );

  const diffPng = new PNG({ width: targetWidth, height: targetHeight });

  const mismatchedPixels = pixelmatch(
    basePng.data,
    comparePng.data,
    diffPng.data,
    targetWidth,
    targetHeight,
    { threshold: 0.1, diffMask: false },
  );

  // if mismatched then write diff image
  if (mismatchedPixels) {
    diffPng.pack().pipe(fs.createWriteStream(diffImagePath));
  }

  return (mismatchedPixels / (targetWidth * targetHeight)) * 100;
};

const readPngs = (dir: string) => fs.readdirSync(dir).filter((n) => n.endsWith('.png'));

const prettyList = (list: string[]) => list.map((i) => ` * ${i}`).join('\n');

const ossDomain = `https://${ALI_OSS_BUCKET}.oss-cn-shanghai.aliyuncs.com`;

async function downloadFile(url: string, destPath: string) {
  const response = await fetch(url);
  if (!response.ok || response.status !== 200) {
    throw new Error(`Download file failed: ${new URL(url).pathname}`);
  }
  // @ts-ignore
  const body = Readable.fromWeb(response.body);
  await finished(body.pipe(fs.createWriteStream(destPath)));
}

async function getBranchLatestRef(branchName: string) {
  const baseImageRefUrl = `${ossDomain}/${branchName}/visual-regression-ref.txt`;
  // get content from baseImageRefText
  const res = await fetch(baseImageRefUrl);
  const text = await res.text();
  const ref = text.trim();
  return ref;
}

async function downloadBaseSnapshots(ref: string, targetDir: string) {
  // download imageSnapshotsUrl
  const imageSnapshotsUrl = `${ossDomain}/${ref}/imageSnapshots.tar.gz`;
  const targzPath = path.resolve(os.tmpdir(), `./${path.basename(targetDir)}.tar.gz`);
  await downloadFile(imageSnapshotsUrl, targzPath);
  // untar
  return tar.x({
    // remove top-level dir
    strip: 1,
    C: targetDir,
    file: targzPath,
  });
}

interface IBadCase {
  type: 'removed' | 'changed';
  filename: string;
}

function md2Html(md: string) {
  return remark().use(remarkGfm).use(remarkHtml).processSync(md).toString();
}

function generateReport(
  badCases: IBadCase[],
  targetBranch: string,
  targetRef: string,
): [string, string] {
  // parse args from -- --pr-id=123
  const argv = minimist(process.argv.slice(2));
  const prId = argv['pr-id'];
  assert(prId, 'Missing --pr-id');
  const publicPath = `${ossDomain}/pr-${prId}`;

  const commonHeader = `
## Visual Regression Report for PR #${prId}
> **Target branch:** ${targetBranch} (${targetRef})
  `.trim();

  if (badCases.length === 0) {
    const mdStr = [
      commonHeader,
      '------------------------',
      'Congrats! No visual-regression diff found',
    ].join('\n');

    return [mdStr, md2Html(mdStr)];
  }

  const htmlReportLink = `${publicPath}/visualRegressionReport/report.html`;

  const addonFullReportDesc = `\n\nToo many visual-regression diffs found, please check [Full Report](${htmlReportLink}) for details`;

  // github action pr comment has limit of 65536 4-byte unicode characters
  const limit = 65536 - addonFullReportDesc.length;

  let reportMdStr = `
${commonHeader}
> [View Full Report](${htmlReportLink})\n
------------------------
| image name | expected | actual | diff |
| --- | --- | --- | --- |
    `.trim();
  reportMdStr += '\n';

  let fullVersionMd = reportMdStr;

  let addonFullReportDescAdded = false;

  for (const badCase of badCases) {
    const { filename, type } = badCase;
    let lineReportMdStr = '';
    if (type === 'changed') {
      lineReportMdStr += '| ';
      lineReportMdStr += [
        badCase.filename,
        `![${targetBranch}: ${targetRef}](${publicPath}/visualRegressionReport/images/base/${filename})`,
        `![current: pr-${prId}](${publicPath}/visualRegressionReport/images/current/${filename})`,
        `![diff](${publicPath}/visualRegressionReport/images/diff/${filename})`,
      ].join(' | ');
      lineReportMdStr += ' |\n';
    } else if (type === 'removed') {
      lineReportMdStr += '| ';
      lineReportMdStr += [
        badCase.filename,
        `![${targetBranch}: ${targetRef}](${publicPath}/visualRegressionReport/images/base/${filename})`,
        `⛔️⛔️⛔️ Missing ⛔️⛔️⛔️`,
        `🚨🚨🚨 Removed 🚨🚨🚨`,
      ].join(' | ');
      lineReportMdStr += ' |\n';
    }

    if (lineReportMdStr) {
      if (reportMdStr.length + lineReportMdStr.length < limit) {
        reportMdStr += lineReportMdStr;
      } else if (!addonFullReportDescAdded) {
        reportMdStr += addonFullReportDesc;
        addonFullReportDescAdded = true;
      }
      fullVersionMd += lineReportMdStr;
    }
  }

  // convert fullVersionMd to html
  return [reportMdStr, md2Html(fullVersionMd)];
}

async function boot() {
  console.log(chalk.green('Preparing image snapshots from latest `master` branch\n'));
  const baseImgSourceDir = path.resolve(__dirname, '../../imageSnapshots-master');
  await fse.ensureDir(baseImgSourceDir);

  const targetBranch = 'master';
  const targetRef = await getBranchLatestRef(targetBranch);
  assert(targetRef, `Missing ref from ${targetBranch}`);

  await downloadBaseSnapshots(targetRef, baseImgSourceDir);

  const currentImgSourceDir = path.resolve(__dirname, '../../imageSnapshots');

  const reportDir = path.resolve(__dirname, '../../visualRegressionReport');
  // save diff images(x3) to reportDir
  const diffImgReportDir = path.resolve(reportDir, './images/diff');
  const baseImgReportDir = path.resolve(reportDir, './images/base');
  const currentImgReportDir = path.resolve(reportDir, './images/current');

  await fse.ensureDir(diffImgReportDir);
  await fse.ensureDir(baseImgReportDir);
  await fse.ensureDir(currentImgReportDir);

  console.log(chalk.blue('⛳ Checking image snapshots with branch %s'), targetBranch);
  console.log('\n');

  const baseImgFileList = readPngs(baseImgSourceDir);
  const currentImgFileList = readPngs(currentImgSourceDir);

  const deletedImgs = _.difference(baseImgFileList, currentImgFileList);
  if (deletedImgs.length) {
    console.log(chalk.red('⛔️ Missing images compare to master:\n'), prettyList(deletedImgs));
    console.log('\n');
  }
  // ignore new images
  const newImgs = _.difference(currentImgFileList, baseImgFileList);
  if (newImgs.length) {
    console.log(chalk.green('🆕 Added images:\n'), prettyList(newImgs));
    console.log('\n');
  }

  const badCases: IBadCase[] = [];

  // compare cssinjs and css-var png from pr
  // to the same cssinjs png in `master` branch
  const cssinjsImgs = baseImgFileList.filter((i) => !i.endsWith('.css-var.png'));

  for (const file of cssinjsImgs) {
    const baseImgPath = path.join(baseImgSourceDir, file);
    const currentImgPath = path.join(currentImgSourceDir, file);
    const diffImgPath = path.join(diffImgReportDir, file);

    const currentImgExists = await fse.exists(currentImgPath);
    if (!currentImgExists) {
      console.log(chalk.red(`⛔️ Missing image: ${file}\n`));
      badCases.push({
        type: 'removed',
        filename: file,
      });
      await fse.copy(baseImgPath, path.join(baseImgReportDir, file));
      continue;
    }

    const mismatchedPxPercent = await compareScreenshots(baseImgPath, currentImgPath, diffImgPath);

    if (mismatchedPxPercent > 0) {
      console.log(
        'Mismatched pixels for:',
        chalk.yellow(file),
        `${mismatchedPxPercent.toFixed(2)}%\n`,
      );
      // copy compare imgs(x2) to report dir
      await fse.copy(baseImgPath, path.join(baseImgReportDir, file));
      await fse.copy(currentImgPath, path.join(currentImgReportDir, file));

      badCases.push({
        type: 'changed',
        filename: file,
      });
    } else {
      console.log('Passed for: %s\n', chalk.green(file));
    }
  }

  if (badCases.length) {
    console.log(chalk.red('⛔️ Failed cases:\n'), prettyList(badCases.map((i) => i.filename)));
    console.log('\n');
  }

  const jsonl = badCases.map((i) => JSON.stringify(i)).join('\n');
  // write jsonl and markdown report to diffImgDir
  await fse.writeFile(path.join(reportDir, './report.jsonl'), jsonl);
  const [reportMdStr, reportHtmlStr] = generateReport(badCases, targetBranch, targetRef);
  await fse.writeFile(path.join(reportDir, './report.md'), reportMdStr);
  const htmlTemplate = await fse.readFile(path.join(__dirname, './report-template.html'), 'utf8');

  await fse.writeFile(
    path.join(reportDir, './report.html'),
    htmlTemplate.replace('{{reportContent}}', reportHtmlStr),
    'utf-8',
  );

  await tar.c(
    {
      gzip: true,
      // ignore top-level dir(e.g. visualRegressionReport) and zip all files in it
      cwd: reportDir,
      file: `${path.basename(reportDir)}.tar.gz`,
    },
    await fse.readdir(reportDir),
  );
}

boot();
