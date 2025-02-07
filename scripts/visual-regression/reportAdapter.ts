import fs from 'fs-extra';
import fg from 'fast-glob';
import path from 'path';
// locked to v2.2.0
import { getReportHtmlAfterPopulatingData, getReportJsonWithTotalStats } from 'cypress-image-diff-html-report/dist/common/utils'
import type { IBadCase } from './build'

const ROOT = path.resolve(__dirname, '../../');
const REPORT_DIR = path.join(ROOT, 'visualRegressionReport');

const components = fg.sync(
  'components/*/index.ts[x]',
  { cwd: ROOT }
)
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
  const _extension = parts.pop();

  const isCssVar = parts.at(-1) === 'css-var';

  let theme: 'dark' | 'compact' | 'default' = 'default';
  let firstHalf: string = '';

  if (isCssVar) {
    [firstHalf, theme] = (parts.pop(), parts) as any[];
  } else if (parts.length >= 2) {
    [firstHalf, theme] = parts as any[];
  }

  let componentName: string = '';
  let demoName: string = '';


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
  }
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
    ...extractFilenameComponents(badCase.filename)
  }));

  Array
    .from(processedComponents)
    .sort((a, b) => b.length - a.length)
    .forEach((component) => {
      const componentBadCases = processedBadCases.filter((badCase) => badCase.componentName === component);

      const specPath = path.join('components', component, '__tests__/image.test.ts');

      // https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/playground/example.json#L61-L70
      const tests = componentBadCases.map((badCase) => {

        let baselinePath, comparisonPath, diffPath;

        if (badCase.raw.type === 'changed') {
          baselinePath = `${publicPath}/images/base/${badCase.raw.filename}`;
          comparisonPath = `${publicPath}/images/current/${badCase.raw.filename}`;
          diffPath = `${publicPath}/images/diff/${badCase.raw.filename}`;
        } else if (badCase.raw.type === 'removed') {
          baselinePath = `${publicPath}/images/base/${badCase.raw.filename}`;
          comparisonPath = 'missing';
          diffPath = 'Removed';
        } else if (badCase.raw.type === 'added') {
          baselinePath = 'missing';
          comparisonPath = `${publicPath}/images/current/${badCase.raw.filename}`;
          diffPath = 'Added';
        }

        const name =[
          `${specPath}/${badCase.demoName}.tsx`,
          `[${badCase.theme}]`,
          badCase.isCssVar && '(CSS Var)'
        ].filter(Boolean).join(' ');

        return {
          status: "fail",
          name,
          percentage: badCase.raw.weight,
          failureThreshold: 0.1, // 由 scripts/visual-regression/build.ts 决定
          specPath,
          specFilename: path.basename(specPath),
          baselinePath,
          diffPath,
          comparisonPath,
        }
      })

      // https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/playground/example.json#L57-L73
      const suite = {
        name: component,
        path: specPath,
        tests
      }

      suites.push(suite);
    });

  return {
    total,
    totalPassed: 0,
    totalFailed: total,
    suites,
    // \\\\\\ 不那么重要的字段 \\\\\\
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    duration: Math.floor(Math.random() * 1000),
    browserName: 'chrome',
    browserVersion: 'unknown',
    cypressVersion: "10.8.0" // 写死
  }
};

interface Options {
  badCases: IBadCase[];
  publicPath?: string;
}

const defaultOptions: Required<Options> = {
  badCases: [],
  publicPath: '.'
}

export const generate = async (opt: Options) => {
  const options = { ...defaultOptions, ...opt };

  const reportJson = convertReport(options);

  // copied from https://github.com/kien-ht/cypress-image-diff-html-report/blob/v2.2.0/src/core.ts#L17-L27
  const jsonWithTotalStats = getReportJsonWithTotalStats(reportJson as any)
  const html = await getReportHtmlAfterPopulatingData(jsonWithTotalStats)

  const target = path.join(REPORT_DIR, 'index.html')

  try {
    await fs.ensureFile(target)
    await fs.writeFile(target, html)
  } catch (err) {
    throw Error((err as Error).message)
  }
}
