/* eslint-disable compat/compat */
/* eslint-disable no-console, no-await-in-loop, import/no-extraneous-dependencies, no-restricted-syntax */
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
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import sharp from 'sharp';
import tar from 'tar';

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
  /**
   * 0 - 1
   */
  weight: number;
}

function md2Html(md: string) {
  return remark().use(remarkGfm).use(remarkHtml).processSync(md).toString();
}

function parseArgs() {
  // parse args from -- --pr-id=123 --base_ref=feature
  const argv = minimist(process.argv.slice(2));
  const prId = argv['pr-id'];
  assert(prId, 'Missing --pr-id');
  const baseRef = argv['base-ref'];
  assert(baseRef, 'Missing --base-ref');
  return {
    prId,
    baseRef,
  };
}

function generateReport(
  badCases: IBadCase[],
  targetBranch: string,
  targetRef: string,
  prId: string,
): [string, string] {
  const reportDirname = path.basename(REPORT_DIR);

  const publicPath = isLocalEnv ? '.' : `${ossDomain}/pr-${prId}/${reportDirname}`;

  const passed = badCases.length === 0;

  const commonHeader = `
## 👁 Visual Regression Report for PR #${prId} ${passed ? 'Passed ✅' : 'Failed ❌'}
> **🎯 Target branch:** ${targetBranch} (${targetRef})
  `.trim();

  const htmlReportLink = `${publicPath}/report.html`;
  const addonFullReportDesc = `\n\nCheck <a href="${htmlReportLink}" target="_blank">Full Report</a> for details`;

  const fullReport = `> 📖 <a href="${htmlReportLink}" target="_blank">View Full Report ↗︎</a>`;
  if (passed) {
    const mdStr = [
      commonHeader,
      fullReport,
      '\n🎊 Congrats! No visual-regression diff found.\n',
      '<img src="https://github.com/ant-design/ant-design/assets/507615/2d1a77dc-dbc6-4b0f-9cbc-19a43d3c29cd" width="300" />',
    ].join('\n');

    return [mdStr, md2Html(mdStr)];
  }

  let reportMdStr = `
${commonHeader}
${fullReport}

| Image name | Expected | Actual | Diff |
| --- | --- | --- | --- |
    `.trim();

  reportMdStr += '\n';

  let fullVersionMd = reportMdStr;

  let diffCount = 0;

  for (const badCase of badCases) {
    const { filename, type } = badCase;
    let lineReportMdStr = '';
    if (type === 'changed') {
      lineReportMdStr += '| ';
      lineReportMdStr += [
        `\`${badCase.filename}\``,
        `![${targetBranch}: ${targetRef}](${publicPath}/images/base/${filename})`,
        `![current: pr-${prId}](${publicPath}/images/current/${filename})`,
        `![diff](${publicPath}/images/diff/${filename})`,
      ].join(' | ');
      lineReportMdStr += ' |\n';
    } else if (type === 'removed') {
      lineReportMdStr += '| ';
      lineReportMdStr += [
        `\`${badCase.filename}\``,
        `![${targetBranch}: ${targetRef}](${publicPath}/images/base/${filename})`,
        `⛔️⛔️⛔️ Missing ⛔️⛔️⛔️`,
        `🚨🚨🚨 Removed 🚨🚨🚨`,
      ].join(' | ');
      lineReportMdStr += ' |\n';
    }

    diffCount += 1;
    if (diffCount <= 10) {
      reportMdStr += lineReportMdStr;
    }

    fullVersionMd += lineReportMdStr;
  }

  reportMdStr += addonFullReportDesc;

  // convert fullVersionMd to html
  return [reportMdStr, md2Html(fullVersionMd)];
}

async function boot() {
  const { prId, baseRef: targetBranch = 'master' } = parseArgs();

  const baseImgSourceDir = path.resolve(ROOT_DIR, `./imageSnapshots-${targetBranch}`);

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

  for (const basename of cssInJsImgNames) {
    for (const extname of ['.png', '.css-var.png']) {
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
        badCases.push({
          type: 'removed',
          filename: compareImgName,
          weight: 1,
        });
        await fse.copy(baseImgPath, path.join(baseImgReportDir, compareImgName));
        continue;
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
        // copy compare imgs(x2) to report dir
        await fse.copy(baseImgPath, path.join(baseImgReportDir, compareImgName));
        await fse.copy(currentImgPath, path.join(currentImgReportDir, compareImgName));

        badCases.push({
          type: 'changed',
          filename: compareImgName,
          weight: mismatchedPxPercent,
        });
      } else {
        console.log('Passed for: %s\n', chalk.green(compareImgName));
      }
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
    prId,
  );
  await fse.writeFile(path.join(REPORT_DIR, './report.md'), reportMdStr);
  const htmlTemplate = await fse.readFile(path.join(__dirname, './report-template.html'), 'utf8');

  await fse.writeFile(
    path.join(REPORT_DIR, './report.html'),
    htmlTemplate.replace('{{reportContent}}', reportHtmlStr),
    'utf-8',
  );

  await tar.c(
    {
      gzip: true,
      // ignore top-level dir(e.g. visualRegressionReport) and zip all files in it
      cwd: REPORT_DIR,
      file: `${path.basename(REPORT_DIR)}.tar.gz`,
    },
    await fse.readdir(REPORT_DIR),
  );

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

  if (!badCases.length) {
    console.log(chalk.green('🎉 All passed!'));
    console.log('\n');
    return;
  }

  const sortedBadCases = badCases.sort((a, b) => b.weight - a.weight);
  console.log(chalk.red('⛔️ Failed cases:\n'));
  console.log(prettyList(sortedBadCases.map((i) => `[${i.type}] ${i.filename}`)));
  console.log('\n');
  // let job failed
  process.exit(1);
}

boot();
