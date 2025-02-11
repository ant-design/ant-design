import fs from 'fs-extra';
import fg from 'fast-glob';
import path from 'path';
import { PNG } from 'pngjs';
// locked to v2.2.0
import {
  getReportHtmlAfterPopulatingData,
  getReportJsonWithTotalStats,
} from 'cypress-image-diff-html-report/dist/common/utils';
import type { IBadCase } from './build';

const ROOT = path.resolve(__dirname, '../../');
const REPORT_DIR = path.join(ROOT, 'visualRegressionReport');

const components = fg
  .sync('components/*/index.ts[x]', { cwd: ROOT })
  .reduce((acc, file) => {
    const basePath = path.dirname(file);
    if (
      [
        fs.existsSync(path.join(basePath, 'index.en-US.md')),
        fs.existsSync(path.join(basePath, 'demo')),
        fs.existsSync(path.join(basePath, '__tests__')),
      ].every(Boolean)
    ) {
      acc.push(path.basename(basePath));
    }

    return acc;
  }, [] as string[])
  .sort((a, b) => b.length - a.length);

const processedComponents = new Set<string>();
const extractFilenameComponents = (filename: string) => {
  const parts = filename.split('.');

  const isCssVar = filename.endsWith('.css-var.png');
  const [firstHalf, theme] = parts as any[];

  let componentName = '';
  let demoName = '';

  for (const component of components) {
    if (firstHalf?.length && firstHalf.startsWith(component)) {
      componentName = component;
      demoName = firstHalf.slice(component.length + 1);
      processedComponents.add(component);
      break;
    }
  }

  return {
    componentName,
    demoName,
    theme,
    isCssVar,
  };
};

// https://placehold.co/
const imagesPlaceHold = {
  genMissing: (w = 680, h = 280) =>
    `https://placehold.co/${w}x${h}/transparent/red?text=MISS&font=lora`,
  getRemoved: (w = 680, h = 280) =>
    `https://placehold.co/${w}x${h}/transparent/red?text=REMOVED&font=lora`,
  getAdded: (w = 680, h = 280) =>
    `https://placehold.co/${w}x${h}/transparent/green?text=ADDED&font=lora`,
};

const getImageSize = (imagePath: string) => {
  const png = PNG.sync.read(fs.readFileSync(imagePath));

  return {
    width: Math.floor(png.width),
    height: Math.floor(png.height),
  };
};

/**
 * 转化为特定格式 (cypress-image-diff-html-report 格式) 的报告
 * @example-json https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/playground/example.json
 * @type https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/src/common/types.ts
 */
const convertReport = (options: Required<Options>) => {
  const { badCases, publicPath } = options;

  const total = badCases.length;
  const suites: any[] = [];

  const processedBadCases = badCases.map((badCase) => ({
    raw: badCase,
    ...extractFilenameComponents(badCase.filename),
  }));

  Array.from(processedComponents)
    .sort((a, b) => b.length - a.length)
    .forEach((component) => {
      const componentBadCases = processedBadCases.filter(
        (badCase) => badCase.componentName === component,
      );

      const specPath = path.join('components', component, '__tests__/image.test.ts');

      const tests = componentBadCases.map((badCase) => {
        let baselinePath;
        let comparisonPath;
        let diffPath;

        const { filename, type } = badCase.raw;

        if (type === 'changed') {
          baselinePath = `${publicPath}/images/base/${filename}`;
          comparisonPath = `${publicPath}/images/current/${filename}`;
          diffPath = `${publicPath}/images/diff/${filename}`;
        } else if (type === 'removed') {
          const pathSuffix = `images/base/${filename}`;
          const { width, height } = getImageSize(path.join(REPORT_DIR, pathSuffix));

          baselinePath = `${publicPath}/${pathSuffix}`;
          comparisonPath = imagesPlaceHold.genMissing(width, height); // Missing
          diffPath = imagesPlaceHold.getRemoved(width, height); // Removed
        } else if (type === 'added') {
          const pathSuffix = `images/current/${filename}`;
          const { width, height } = getImageSize(path.join(REPORT_DIR, pathSuffix));

          baselinePath = imagesPlaceHold.genMissing(width, height); // Missing
          comparisonPath = `${publicPath}/${pathSuffix}`;
          diffPath = imagesPlaceHold.getAdded(width, height); // Added
        }

        const name = [
          `components/${badCase.componentName}/demo/${badCase.demoName}.tsx`,
          `[${badCase.theme}]`,
          badCase.isCssVar && '(CSS Var)',
        ]
          .filter(Boolean)
          .join(' ');

        // https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/playground/example.json#L61-L70
        return {
          status: 'fail',
          name,
          percentage: badCase.raw.weight,
          failureThreshold: 0.1, // 由 scripts/visual-regression/build.ts 决定
          specPath,
          specFilename: path.basename(specPath),
          baselinePath,
          diffPath,
          comparisonPath,
        };
      });

      // https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/playground/example.json#L57-L73
      const suite = {
        name: component,
        path: specPath,
        tests,
      };

      suites.push(suite);
    });

  return {
    total,
    totalPassed: 0,
    totalFailed: total,
    suites: suites.sort((a, b) => a.name.localeCompare(b.name)),
    // \\\\\\ 不那么重要的字段 \\\\\\
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    duration: Math.floor(Math.random() * 1000),
    browserName: 'chrome',
    browserVersion: 'unknown',
    cypressVersion: '10.8.0', // 写死
  };
};

interface Options {
  badCases: IBadCase[];
  publicPath?: string;
}

const defaultOptions: Required<Options> = {
  badCases: [],
  publicPath: '.',
};

export const generate = async (opt: Options) => {
  const options = { ...defaultOptions, ...opt };

  const reportJson = convertReport(options);

  // copied from https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/src/core.ts#L17-L27
  const jsonWithTotalStats = getReportJsonWithTotalStats(reportJson as any);
  const html = await getReportHtmlAfterPopulatingData(jsonWithTotalStats);

  const target = path.join(REPORT_DIR, 'index.html');

  try {
    await fs.ensureFile(target);
    await fs.writeFile(target, html);
  } catch (err) {
    fs.removeSync(target);
    throw new Error((err as Error).message);
  }
};
