import { assert } from 'console';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import chalk from 'chalk';
import fse from 'fs-extra';
import difference from 'lodash/difference';
import minimist from 'minimist';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';
import simpleGit from 'simple-git';
import filter from 'lodash/filter';

import markdown2Html from './convert';
import { generate as genAlternativeReport } from './reportAdapter';

const ROOT_DIR = process.cwd();
const ALI_OSS_BUCKET = 'antd-visual-diff';

const REPORT_DIR = path.join(ROOT_DIR, './visualRegressionReport');

const isLocalEnv = process.env.LOCAL;

const compareScreenshots = async (
  baseImgPath: string,
  currentImgPath: string,
  diffImagePath: string,
): Promise<number> => {
  const baseImgBuf = await sharp(baseImgPath).toBuffer();
  const currentImgBuf = await sharp(currentImgPath).toBuffer();

  const basePng = PNG.sync.read(baseImgBuf);
  const currentPng = PNG.sync.read(currentImgBuf);

  const targetWidth = Math.max(basePng.width, currentPng.width);
  const targetHeight = Math.max(basePng.height, currentPng.height);

  // fill color for transparent png
  const fillColor =
    baseImgPath.endsWith('dark.png') || baseImgPath.endsWith('dark.css-var.png')
      ? { r: 0, g: 0, b: 0, alpha: 255 }
      : { r: 255, g: 255, b: 255, alpha: 255 };

  const resizeOptions = {
    width: targetWidth,
    height: targetHeight,
    position: 'left top',
    fit: sharp.fit.contain,
    background: fillColor,
  };

  const resizedBasePng = PNG.sync.read(
    await sharp(baseImgBuf).resize(resizeOptions).png().toBuffer(),
  );

  const resizedCurrentPng = PNG.sync.read(
    await sharp(currentImgBuf).resize(resizeOptions).png().toBuffer(),
  );

  const diffPng = new PNG({ width: targetWidth, height: targetHeight });

  const mismatchedPixels = pixelmatch(
    resizedBasePng.data,
    resizedCurrentPng.data,
    diffPng.data,
    targetWidth,
    targetHeight,
    { threshold: 0.1, diffMask: false },
  );

  // if mismatched then write diff image
  if (mismatchedPixels) {
    diffPng.pack().pipe(fs.createWriteStream(diffImagePath));
  }

  return mismatchedPixels / (targetWidth * targetHeight);
};

const readPngs = (dir: string) => fs.readdirSync(dir).filter((n) => n.endsWith('.png'));

const prettyList = (list: string[]) => list.map((i) => ` * ${i}`).join('\n');

const ossDomain = `https://${ALI_OSS_BUCKET}.oss-accelerate.aliyuncs.com`;

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
  const tar = await import('tar');
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

interface IImageDesc {
  src: string;
  alt: string;
}

function getMdImageTag(desc: IImageDesc, extraCaption?: boolean) {
  const { src, alt } = desc;
  if (!extraCaption || !alt) {
    // in md2html report, we use `@microflash/rehype-figure` to generate a figure
    return `![${alt}](${src})`;
  }
  // show caption with image in github markdown comment
  return `![${alt}](${src}) ${alt}`;
}

export interface IBadCase {
  type: 'removed' | 'changed' | 'added';
  filename: string;
  /**
   * compare target file
   */
  targetFilename?: string;
  /**
   * 0 - 1
   */
  weight: number;
}

const git = simpleGit();

async function parseArgs() {
  // parse args from -- --pr-id=123 --base_ref=feature --max-workers=2
  const argv = minimist(process.argv.slice(2));
  const prId = argv['pr-id'];
  assert(prId, 'Missing --pr-id');
  const baseRef = argv['base-ref'];
  assert(baseRef, 'Missing --base-ref');

  const maxWorkers = argv['max-workers'] ? parseInt(argv['max-workers'], 10) : 1;

  const { latest } = await git.log();

  return {
    prId,
    baseRef,
    currentRef: latest?.hash.slice(0, 8) || '',
    maxWorkers,
  };
}

function generateLineReport(
  badCase: IBadCase,
  publicPath: string,
  currentRef: string,
  extraCaption?: boolean,
) {
  const { filename, type, targetFilename } = badCase;

  let lineHTMLReport = '';
  if (type === 'changed') {
    lineHTMLReport += '| ';
    lineHTMLReport += [
      // add ref as query to avoid github cache image object
      getMdImageTag(
        {
          src: `${publicPath}/images/base/${filename}?ref=${currentRef}`,
          alt: targetFilename || '',
        },
        extraCaption,
      ),
      getMdImageTag(
        {
          src: `${publicPath}/images/current/${filename}?ref=${currentRef}`,
          alt: filename,
        },
        extraCaption,
      ),
      getMdImageTag(
        {
          src: `${publicPath}/images/diff/${filename}?ref=${currentRef}`,
          alt: '',
        },
        extraCaption,
      ),
    ].join(' | ');
    lineHTMLReport += ' |\n';
  } else if (type === 'removed') {
    lineHTMLReport += '| ';
    lineHTMLReport += [
      getMdImageTag(
        {
          src: `${publicPath}/images/base/${filename}?ref=${currentRef}`,
          alt: filename || '',
        },
        extraCaption,
      ),
      `⛔️⛔️⛔️ Missing ⛔️⛔️⛔️`,
      `🚨🚨🚨 Removed 🚨🚨🚨`,
    ].join(' | ');
    lineHTMLReport += ' |\n';
  } else if (type === 'added') {
    lineHTMLReport += '| ';
    lineHTMLReport += [
      '',
      getMdImageTag(
        {
          src: `${publicPath}/images/current/${filename}?ref=${currentRef}`,
          alt: filename,
        },
        extraCaption,
      ),
      `🆕🆕🆕 Added 🆕🆕🆕`,
    ].join(' | ');
    lineHTMLReport += ' |\n';
  }
  return lineHTMLReport;
}

function generateReport(
  badCases: IBadCase[],
  targetBranch: string,
  targetRef: string,
  currentRef: string,
  prId: string,
  publicPath = '.',
): [string, string] {
  const passed = badCases.length === 0;

  const commonHeader = `
<!-- ${passed ? 'VISUAL_DIFF_SUCCESS' : 'VISUAL_DIFF_FAILED'} -->

## 👁 Visual Regression Report for PR #${prId} ${passed ? 'Passed ✅' : 'Failed ❌'}
> **🎯 Target branch:** ${targetBranch} (${targetRef})
  `.trim();

  const htmlReportLink = `${publicPath}/report.html`;
  const alternativeReportLink = `${publicPath}/index.html`;

  const fullReport = [
    `> 📖 <a href="${htmlReportLink}" target="_blank">View Full Report ↗︎</a>`,
    `> 📖 <a href="${alternativeReportLink}" target="_blank">Alternative Report ↗︎</a>`,
  ].join('\n');

  if (passed) {
    const mdStr = [
      commonHeader,
      fullReport,
      '\n🎊 Congrats! No visual-regression diff found.\n',
      '<img src="https://github.com/ant-design/ant-design/assets/507615/2d1a77dc-dbc6-4b0f-9cbc-19a43d3c29cd" width="300" />',
    ].join('\n');

    return [mdStr, markdown2Html(mdStr)];
  }

  const summaryHeader = '<!-- summary -->';
  const tableHeader = `
| Expected (Branch ${targetBranch}) | Actual (Current PR) | Diff |
| --- | --- | --- |
  `.trim();

  let reportMdStr = [
    commonHeader,
    isLocalEnv ? false : `${fullReport}`,
    summaryHeader,
    '\n',
    tableHeader,
  ]
    .filter(Boolean)
    .join('\n');

  reportMdStr += '\n';

  let fullVersionMd = reportMdStr;

  let diffCount = 0;

  // Summary
  const badCount = badCases.length;
  const commentReportLimit = isLocalEnv ? badCount : 8;

  const changedCount = filter(badCases, { type: 'changed' }).length;
  const removedCount = filter(badCases, { type: 'removed' }).length;
  const addedCount = filter(badCases, { type: 'added' }).length;

  for (const badCase of badCases) {
    diffCount += 1;
    if (diffCount <= commentReportLimit) {
      // 将图片下方增加文件名
      reportMdStr += generateLineReport(badCase, publicPath, currentRef, true);
    }

    fullVersionMd += generateLineReport(badCase, publicPath, currentRef, false);
  }

  const hasMore = badCount > commentReportLimit;

  if (hasMore) {
    reportMdStr += [
      '\r',
      '> [!WARNING]',
      `> There are more diffs not shown in the table. Please check the <a href="${htmlReportLink}" target="_blank">Full Report</a> for details.`,
      '\r',
    ].join('\n');
  }

  // tips for comment `Pass Visual Diff` will pass the CI
  if (!passed) {
    const summaryLine = [
      changedCount > 0 && `🔄 \`${changedCount}\` changed`,
      removedCount > 0 && `🛑 \`${removedCount}\` removed`,
      addedCount > 0 && `🆕 \`${addedCount}\` added`,
    ]
      .filter(Boolean)
      .join(', ');

    reportMdStr += [
      '\n---\n',
      '> [!IMPORTANT]',
      `> There are **${badCount}** diffs found in this PR: ${summaryLine}.`,
      '> **Please check all items:**',
      hasMore && '> - [ ] Checked all diffs in the full report',
      '> - [ ] Visual diff is acceptable',
    ]
      .filter(Boolean)
      .join('\n');

    reportMdStr = reportMdStr.replace(summaryHeader, `> **📊 Summary:** ${summaryLine}`);
    fullVersionMd = fullVersionMd.replace(summaryHeader, `> **📊 Summary:** ${summaryLine}`);
  }

  // convert fullVersionMd to html
  return [reportMdStr, markdown2Html(fullVersionMd)];
}

async function boot() {
  const args = await parseArgs();
  console.log(`Args: ${JSON.stringify(args)}`);

  const { prId, baseRef: targetBranch = 'master', currentRef, maxWorkers } = args;

  const baseImgSourceDir = path.resolve(ROOT_DIR, `./imageSnapshots-${targetBranch}`);

  const publicPath = isLocalEnv ? '.' : `${ossDomain}/pr-${prId}/${path.basename(REPORT_DIR)}`;

  /* --- prepare stage --- */
  console.log(
    chalk.green(
      `Preparing image snapshots from latest \`${targetBranch}\` branch for pr \`${prId}\`\n`,
    ),
  );
  await fse.ensureDir(baseImgSourceDir);

  const targetCommitSha = await getBranchLatestRef(targetBranch);
  assert(targetCommitSha, `Missing commit sha from ${targetBranch}`);

  if (!isLocalEnv) {
    await downloadBaseSnapshots(targetCommitSha, baseImgSourceDir);
  } else if (!fse.existsSync(baseImgSourceDir)) {
    console.log(
      chalk.yellow(
        `Please prepare image snapshots in folder \`$projectRoot/${path.basename(
          baseImgSourceDir,
        )}\` from latest \`${targetBranch}\` branch`,
      ),
    );
    process.exit(1);
  }

  const currentImgSourceDir = path.resolve(ROOT_DIR, './imageSnapshots');

  // save diff images(x3) to reportDir
  const diffImgReportDir = path.resolve(REPORT_DIR, './images/diff');
  const baseImgReportDir = path.resolve(REPORT_DIR, './images/base');
  const currentImgReportDir = path.resolve(REPORT_DIR, './images/current');

  await fse.ensureDir(diffImgReportDir);
  await fse.ensureDir(baseImgReportDir);
  await fse.ensureDir(currentImgReportDir);

  console.log(chalk.blue('⛳ Checking image snapshots with branch %s'), targetBranch);
  console.log('\n');

  const baseImgFileList = readPngs(baseImgSourceDir);

  /* --- compare stage --- */
  const badCases: IBadCase[] = [];

  // compare cssinjs and css-var png from pr
  // to the same cssinjs png in `master` branch
  const cssInJsImgNames = baseImgFileList
    .filter((i) => !i.endsWith('.css-var.png'))
    .map((n) => path.basename(n, path.extname(n)));

  // compare to target branch
  const compareTasks = cssInJsImgNames.map((basename) =>
    ['.png', '.css-var.png'].map((extname) => async () => {
      // baseImg always use cssinjs png
      const baseImgName = `${basename}.png`;
      const baseImgPath = path.join(baseImgSourceDir, baseImgName);

      // currentImg use cssinjs png or css-var png
      const compareImgName = basename + extname;
      const currentImgPath = path.join(currentImgSourceDir, compareImgName);
      const diffImgPath = path.join(diffImgReportDir, compareImgName);

      const currentImgExists = await fse.exists(currentImgPath);
      if (!currentImgExists) {
        console.log(chalk.red(`⛔️ Missing image: ${compareImgName}\n`));
        await fse.copy(baseImgPath, path.join(baseImgReportDir, compareImgName));
        return {
          type: 'removed',
          filename: compareImgName,
          weight: 1,
        } as IBadCase;
      }

      const mismatchedPxPercent = await compareScreenshots(
        baseImgPath,
        currentImgPath,
        diffImgPath,
      );

      if (mismatchedPxPercent > 0) {
        console.log(
          'Mismatched pixels for:',
          chalk.yellow(compareImgName),
          `${(mismatchedPxPercent * 100).toFixed(2)}%\n`,
        );
        await fse.copy(baseImgPath, path.join(baseImgReportDir, compareImgName));
        await fse.copy(currentImgPath, path.join(currentImgReportDir, compareImgName));

        return {
          type: 'changed',
          filename: compareImgName,
          targetFilename: baseImgName,
          weight: mismatchedPxPercent,
        } as IBadCase;
      }
      console.log('Passed for: %s\n', chalk.green(compareImgName));
    }),
  );

  const { default: pAll } = await import('p-all');

  const compareResults = await pAll(compareTasks.flat(), { concurrency: maxWorkers });
  for (const compareResult of compareResults) {
    if (compareResult) {
      badCases.push(compareResult);
    }
  }

  // collect all new added cases
  const currentImgFileList = readPngs(currentImgSourceDir);
  /* --- text report stage --- */
  console.log(
    chalk.blue(`📊 Text report from pr #${prId} comparing to ${targetBranch}@${targetCommitSha}\n`),
  );
  // new images
  const newImgs = difference(currentImgFileList, baseImgFileList);
  if (newImgs.length) {
    console.log(chalk.green(`🆕 ${newImgs.length} images added from this pr`));
    console.log(chalk.green('🆕 Added images list:\n'));
    console.log(prettyList(newImgs));
    console.log('\n');
  }

  const newImgTask = newImgs.map((newImg) => async () => {
    await fse.copy(
      path.join(currentImgSourceDir, newImg),
      path.resolve(currentImgReportDir, newImg),
    );
    return {
      type: 'added',
      filename: newImg,
      weight: 0,
    } as IBadCase;
  });

  const newTaskResults = await pAll(newImgTask, { concurrency: maxWorkers });
  for (const newTaskResult of newTaskResults) {
    if (newTaskResult) {
      badCases.push(newTaskResult);
    }
  }

  /* --- generate report stage --- */
  const jsonl = badCases.map((i) => JSON.stringify(i)).join('\n');
  // write jsonl and markdown report to diffImgDir
  await fse.writeFile(path.join(REPORT_DIR, './report.jsonl'), jsonl);
  const [reportMdStr, reportHtmlStr] = generateReport(
    badCases,
    targetBranch,
    targetCommitSha,
    currentRef,
    prId,
    publicPath,
  );
  await fse.writeFile(path.join(REPORT_DIR, './report.md'), reportMdStr);
  const htmlTemplate = await fse.readFile(path.join(__dirname, './report-template.html'), 'utf8');

  await fse.writeFile(
    path.join(REPORT_DIR, './report.html'),
    htmlTemplate.replace('{{reportContent}}', reportHtmlStr),
    'utf-8',
  );

  // 尝试生成替代报告，即便失败也可以用原来报告兜底
  try {
    await genAlternativeReport({
      badCases,
      publicPath,
    });
    console.log(chalk.green('🎉 Alternative report generated!'));
  } catch {
    console.error(chalk.red('😢 Alternative report generation failed'));
  }

  const tar = await import('tar');
  await tar.c(
    {
      gzip: true,
      // ignore top-level dir(e.g. visualRegressionReport) and zip all files in it
      cwd: REPORT_DIR,
      file: `${path.basename(REPORT_DIR)}.tar.gz`,
    },
    await fse.readdir(REPORT_DIR),
  );

  const validBadCases = badCases.filter((i) => ['removed', 'changed'].includes(i.type));

  if (!validBadCases.length) {
    console.log(chalk.green('🎉 All passed!'));
    console.log('\n');
    return;
  }

  const sortedBadCases = badCases.sort((a, b) => b.weight - a.weight);
  console.log(chalk.red('⛔️ Failed cases:\n'));
  console.log(prettyList(sortedBadCases.map((i) => `[${i.type}] ${i.filename}`)));
  console.log('\n');

  // let job failed. Skip to let CI/CD to handle it
  // process.exit(1);
}

boot();
