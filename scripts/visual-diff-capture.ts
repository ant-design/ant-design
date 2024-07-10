/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import fse from 'fs-extra';
import { createServer } from 'http-server';
import { chromium } from 'playwright-chromium';
import type { Browser, BrowserContext, Page } from 'playwright-chromium';
import loglevel from 'loglevel';
import type { LogLevelNames } from 'loglevel';

interface VisualDiffConfig {
  id: string;
  onlyViewport?: boolean;
  openTriggerClassName?: string;
}

const themes = ['default', 'dark', 'compact'];

function retrieveDemoUrl(mdPath: string) {
  // ~demos/components-button-demo-basic
  return mdPath.replace('.md', '').replace(/\//g, '-');
}

async function retrieveConfig(mdPath: string): Promise<VisualDiffConfig> {
  const mdDir = path.dirname(mdPath);
  const configDir = path.join(mdDir, '..', '__tests__');
  const configPath = path.join(configDir, 'visual-diff.config.ts');
  // handle the case that the config file does not exist
  if (!fs.existsSync(configPath)) {
    return { id: path.basename(mdDir) };
  }

  const { default: configModule } = await import(configPath);
  return configModule;
}

async function getAllComponentMds(componentName?: string) {
  const { glob } = await import('glob');
  const globStr = componentName
    ? `components/${componentName}/demo/*.md`
    : 'components/!(overview|_util)/demo/*.md';
  const mds = await glob(globStr, {
    cwd: path.join(process.cwd()),
    dot: false,
  });

  return mds;
}

async function createSiteServer() {
  const port = 3000;
  const server = createServer({ root: path.join(process.cwd(), '_site') });
  server.listen(port);
  return server;
}

class BrowserAuto {
  private browser: Browser | null = null;

  private context: BrowserContext | null = null;

  private outputDir = './imageSnapshots';

  async init() {
    this.browser = await chromium.launch({
      headless: false,
    });
    this.context = await this.browser.newContext({
      viewport: { width: 800, height: 600 },
      deviceScaleFactor: 2,
    });

    this.context.setDefaultTimeout(5000);

    await fse.ensureDir(this.outputDir);
    await fse.emptyDir(this.outputDir);

    const errorFilePath = path.join(this.outputDir, 'error.jsonl');
    await fse.ensureFile(errorFilePath);
    await fse.writeFile(errorFilePath, '');
  }

  async appendErrorLog(errorData: any) {
    const errorFilePath = path.join(this.outputDir, 'error.jsonl');
    const errorLine = JSON.stringify({
      ...errorData,
      timestamp: new Date().toISOString(),
    });
    await fs.promises.writeFile(errorFilePath, `${errorLine}\n`);
  }

  // 执行截屏
  async captureScreenshots(mdPath: string) {
    if (!this.context) return;

    const page = await this.context.newPage();

    // themes
    // 三种主题复用同一张截屏页面

    // 每个不同主题需要单独截图，可否截屏到一起呢
    for (const theme of themes) {
      await this.visitDemoPage(page, mdPath, theme);
    }

    return page?.close();
  }

  private async visitDemoPage(page: Page, mdPath: string, theme: string) {
    const demoUrl = retrieveDemoUrl(mdPath);
    const options = await retrieveConfig(mdPath);

    const pageUrl = `http://localhost:3000/~demos/${demoUrl}?theme=${theme}&enable-css-var=1`;

    await page.goto(pageUrl);
    // TODO: 需要禁用掉页面中的各种采集和埋点请求，避免干扰
    await page.waitForLoadState('networkidle');

    // 禁用掉所有的动画
    await page.addStyleTag({
      content: '*{animation: none!important;}',
    });

    await page.waitForSelector('.dumi-antd-demo-layout');

    if (!options.onlyViewport) {
      // Get scroll height of the rendered page and set viewport
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      await page.setViewportSize({ width: 800, height: bodyHeight });
    }

    // Click trigger element
    if (options.openTriggerClassName) {
      await page.click(`.${options.openTriggerClassName}`);
    }

    // 保存截图到 ./result 目录
    await page.screenshot({
      path: path.join(this.outputDir, `${demoUrl}.${theme}.png`),
      scale: 'device',
      type: 'png',
      fullPage: !options.onlyViewport,
      timeout: 3000,
    });
  }

  // 关闭浏览器
  async close() {
    await this.browser?.close();
  }
}

function parseArgs(): {
  serverOnly?: boolean;
  component?: string;
  logLevel?: LogLevelNames;
} {
  // parse args from -- --server-only=1 --component=button
  const argv = minimist(process.argv.slice(2));

  return {
    logLevel: argv.loglevel as LogLevelNames,
    serverOnly: !!argv['server-only'],
    component: argv.component || '',
  };
}

// npm run visual-diff:capture -- --component=space --loglevel=info --server-only
(async () => {
  const args = parseArgs();
  const { serverOnly, component, logLevel = 'error' } = args;
  loglevel.setLevel(logLevel);

  loglevel.info(`Args: ${JSON.stringify(args)}`);

  const server = await createSiteServer();
  if (serverOnly) {
    return;
  }

  loglevel.info(`Debug mode: ${!!process.env.DEBUG}`);

  const handler = new BrowserAuto();
  await handler.init();
  const mdPaths = await getAllComponentMds(component);
  await fs.promises.writeFile(
    path.resolve(__dirname, '../imageSnapshots', 'md-paths.json'),
    JSON.stringify(mdPaths.map(retrieveDemoUrl), null, 2),
    'utf-8',
  );

  const task = async (mdPath: string) => {
    try {
      await handler.captureScreenshots(mdPath);
    } catch (err) {
      const errorData = {
        filename: mdPath,
        error: (err as Error).message,
      };
      await handler.appendErrorLog(errorData);
      loglevel.error(`Error: ${errorData.error}`);
    }
  };

  const { default: pAll } = await import('p-all');

  // 增加并发
  await pAll(
    mdPaths.map((mdPath, i) => async () => {
      console.log(`处理 ${i + 1}/${mdPaths.length}: ${mdPath}`);
      return task(mdPath);
    }),
    { concurrency: 3 },
  );
  await handler.close();

  server.close();
})();
