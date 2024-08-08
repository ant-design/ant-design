import path from 'path';
import fse from 'fs-extra';
import fg from 'fast-glob';
import reduce from 'lodash/reduce';
import flatMap from 'lodash/flatMap';

function combineMatrix<T>(_matrix: T[][]): [...T[]] {
  return reduce<any[][], any[]>(
    _matrix,
    (acc, curr: any) => flatMap(acc, (x) => curr.map((y: any) => x.concat(y))),
    [[]],
  );
}

const snapshotPath = path.join(process.cwd(), 'imageSnapshots');
fse.ensureDirSync(snapshotPath);
// fse.emptyDirSync(snapshotPath);

type Options = {
  skip?: boolean | string[];
  onlyViewport?: boolean | string[];
  /** Use SSR render instead. Only used when the third part deps component */
  ssr?: boolean;
  /** Open Trigger to check the popup render */
  openTriggerClassName?: string;
};

// eslint-disable-next-line jest/no-export
function imageDemoTest(component: string, options: Options = {}) {
  (options.skip === true ? describe.skip : describe)(`Test ${component} demo`, () => {
    const files = fg.sync(`./components/${component}/demo/[a-z]*.tsx`, {
      onlyFiles: true,
      cwd: process.cwd(),
    });

    const mainMatrix = ['default', 'dark', 'compact'];

    const allMatrix = [...mainMatrix, ...combineMatrix([mainMatrix, ['cssvar']])];

    files.forEach((file) => {
      const demoName = path.basename(file, '.tsx');

      const describeMethod = (function _() {
        if (Array.isArray(options.skip) && options.skip.some((c) => file.endsWith(c))) {
          return describe.skip;
        }
        return describe;
      })();

      const onlyViewport = (function _() {
        return (
          options.onlyViewport === true ||
          (Array.isArray(options.onlyViewport) &&
            options.onlyViewport.some((c) => file.endsWith(c)))
        );
      })();

      // 每一个 demo 都放在一个 describe 里面
      describeMethod(file, () => {
        const matrix = allMatrix.map((m) => {
          const category = Array.isArray(m) ? m : [m];
          return [category.join('_'), category];
        });

        // 每一张截图都放在一个 test 里面
        test.concurrent.each(matrix)(`${demoName}(%s)`, async (suffix, category: any) => {
          // https://github.com/puppeteer/puppeteer/issues/9363#issuecomment-1339721838
          const page = await browser.newPage();

          const urlPrefix = category.map((i: string) => `_${i}`).join('/');
          const realUrl = `http://localhost:8002/${urlPrefix}/${component}/demo/${demoName}`;

          await page.setViewport({ width: 800, height: 600 });
          await page.goto(realUrl /* { waitUntil: 'networkidle0' } */);

          if (!onlyViewport) {
            const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
            await page.setViewport({ width: 800, height: bodyHeight });
          }

          const image = await page.screenshot({
            fullPage: !onlyViewport,
          });

          await fse.writeFile(
            path.join(snapshotPath, `${component}-${demoName}.${suffix}.png`),
            image,
          );

          await page.close();
        });
      });
    });
  });
}

// eslint-disable-next-line jest/no-export, import/prefer-default-export
export { imageDemoTest };
