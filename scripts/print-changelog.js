/* eslint-disable no-await-in-loop, no-console */
const chalk = require('chalk');
const { spawn } = require('child_process');
const jsdom = require('jsdom');
const jQuery = require('jquery');
const fetch = require('isomorphic-fetch');
const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');

const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM('').window;
global.document = document;

const $ = jQuery(window);

const QUERY_TITLE = '.gh-header-title .js-issue-title';
const QUERY_DESCRIPTION_LINES = '.comment-body table tbody tr';
const QUERY_AUTHOR = '.pull-discussion-timeline .TimelineItem:first .author:first';
// https://github.com/orgs/ant-design/teams/ant-design-collaborators/members
const MAINTAINERS = [
  'zombiej',
  'afc163',
  'chenshuai2144',
  'shaodahong',
  'xrkffgg',
  'AshoneA',
  'yesmeck',
  'bang88',
  'yoyo837',
  'hengkx',
  'Rustin-Liu',
  'fireairforce',
  'kerm1it',
  'madccc',
  'MadCcc',
  'li-jia-nan',
  'kiner-tang',
  'Wxh16144',
].map((author) => author.toLowerCase());

const cwd = process.cwd();
const git = simpleGit(cwd);

function getDescription(entity) {
  if (!entity) {
    return '';
  }
  const descEle = entity.element.find('td:last');
  let htmlContent = descEle.html();
  htmlContent = htmlContent.replace(/<code class="notranslate">([^<]*)<\/code>/g, '`$1`');
  return htmlContent.trim();
}

async function printLog() {
  const tags = await git.tags();
  const { default: inquirer } = await import('inquirer');
  const { fromVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'fromVersion',
      message: '🏷  Please choose tag to compare with current branch:',
      choices: tags.all
        .filter((item) => !item.includes('experimental'))
        .filter((item) => !item.includes('alpha'))
        .filter((item) => !item.includes('resource'))
        .reverse()
        .slice(0, 50),
    },
  ]);
  let { toVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'toVersion',
      message: `🔀 Please choose branch to compare with ${chalk.magenta(fromVersion)}:`,
      choices: ['master', '4.x-stable', '3.x-stable', 'feature', 'custom input ⌨️'],
    },
  ]);

  if (toVersion.startsWith('custom input')) {
    const result = await inquirer.prompt([
      {
        type: 'input',
        name: 'toVersion',
        message: `🔀 Please input custom git hash id or branch name to compare with ${chalk.magenta(
          fromVersion,
        )}:`,
        default: 'master',
      },
    ]);
    toVersion = result.toVersion;
  }

  if (!/\d+\.\d+\.\d+/.test(fromVersion)) {
    console.log(chalk.red(`🤪 tag (${chalk.magenta(fromVersion)}) is not valid.`));
  }

  const logs = await git.log({ from: fromVersion, to: toVersion });

  let prList = [];

  for (let i = 0; i < logs.all.length; i += 1) {
    const { message, body, hash, author_name: author } = logs.all[i];

    const text = `${message} ${body}`;

    const match = text.match(/#\d+/g);
    const prs = (match || []).map((pr) => pr.slice(1));
    const validatePRs = [];

    console.log(
      `[${i + 1}/${logs.all.length}]`,
      hash.slice(0, 6),
      '-',
      prs.length ? prs.map((pr) => `#${pr}`).join(',') : '?',
    );
    for (let j = 0; j < prs.length; j += 1) {
      const pr = prs[j];

      // Use jquery to get full html page since it don't need auth token
      let res;
      let tryTimes = 0;
      const timeout = 30000;
      let html;
      const fetchPullRequest = async () => {
        try {
          res = await new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error(`Fetch timeout of ${timeout}ms exceeded`));
            }, timeout);
            fetch(`https://github.com/ant-design/ant-design/pull/${pr}`)
              .then((response) => {
                response.text().then((htmlRes) => {
                  html = htmlRes;
                  resolve(response);
                });
              })
              .catch((error) => {
                reject(error);
              });
          });
        } catch (err) {
          tryTimes++;
          if (tryTimes < 100) {
            console.log(chalk.red(`❌ Fetch error, reason: ${err}`));
            console.log(chalk.red(`⌛️ Retrying...(Retry times: ${tryTimes})`));
            await fetchPullRequest();
          }
        }
      };
      await fetchPullRequest();
      if (res.url.includes('/issues/')) {
        continue;
      }

      const $html = $(html);

      const prTitle = $html.find(QUERY_TITLE).text().trim();
      const prAuthor = $html.find(QUERY_AUTHOR).text().trim();
      const prLines = $html.find(QUERY_DESCRIPTION_LINES);

      const lines = [];
      prLines.each(function getDesc() {
        lines.push({
          text: $(this).text().trim(),
          element: $(this),
        });
      });

      const english = getDescription(lines.find((line) => line.text.includes('🇺🇸 English')));
      const chinese = getDescription(lines.find((line) => line.text.includes('🇨🇳 Chinese')));
      if (english) {
        console.log(`  🇺🇸  ${english}`);
      }
      if (chinese) {
        console.log(`  🇨🇳  ${chinese}`);
      }

      validatePRs.push({
        pr,
        hash,
        title: prTitle,
        author: prAuthor,
        english: english || chinese || prTitle,
        chinese: chinese || english || prTitle,
      });
    }

    if (validatePRs.length === 1) {
      console.log(chalk.cyan(' - Match PR:', `#${validatePRs[0].pr}`));
      prList = prList.concat(validatePRs);
    } else if (message.includes('docs:')) {
      console.log(chalk.cyan(' - Skip document!'));
    } else {
      console.log(chalk.yellow(' - Miss match!'));
      prList.push({
        hash,
        title: message,
        author,
        english: message,
        chinese: message,
      });
    }
  }

  console.log('\n', chalk.green('Done. Here is the log:'));

  function printPR(lang, postLang) {
    prList.forEach((entity) => {
      const { pr, author, hash, title } = entity;
      if (pr) {
        const str = postLang(entity[lang]);
        let icon = '';
        if (str.toLowerCase().includes('fix') || str.includes('修复')) {
          icon = '🐞';
        }
        if (str.toLowerCase().includes('feat')) {
          icon = '🆕';
        }

        let authorText = '';
        if (!MAINTAINERS.includes(author.toLowerCase())) {
          authorText = ` [@${author}](https://github.com/${author})`;
        }

        console.log(
          `- ${icon} ${str}[#${pr}](https://github.com/ant-design/ant-design/pull/${pr})${authorText}`,
        );
      } else {
        console.log(
          `🆘 Miss Match: ${title} -> https://github.com/ant-design/ant-design/commit/${hash}`,
        );
      }
    });
  }

  // Chinese
  console.log('\n');
  console.log(chalk.yellow('🇨🇳 Chinese changelog:'));
  console.log('\n');
  printPR('chinese', (chinese) =>
    chinese[chinese.length - 1] === '。' || !chinese ? chinese : `${chinese}。`,
  );

  console.log('\n-----\n');

  // English
  console.log(chalk.yellow('🇺🇸 English changelog:'));
  console.log('\n');
  printPR('english', (english) => {
    english = english.trim();
    if (english[english.length - 1] !== '.' || !english) {
      english = `${english}.`;
    }
    if (english) {
      return `${english} `;
    }
    return '';
  });

  // Preview editor generate
  // Web source: https://github.com/ant-design/antd-changelog-editor
  let html = fs.readFileSync(path.join(__dirname, 'previewEditor', 'template.html'), 'utf8');
  html = html.replace('// [Replacement]', `window.changelog = ${JSON.stringify(prList)};`);
  fs.writeFileSync(path.join(__dirname, 'previewEditor', 'index.html'), html, 'utf8');

  // Start preview
  const ls = spawn(
    'npx',
    ['http-server', path.join(__dirname, 'previewEditor'), '-c-1', '-p', '2893'],
    {
      shell: true,
    },
  );
  ls.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  console.log(chalk.green('Start changelog preview editor...'));
  const { default: open } = await import('open');

  setTimeout(() => {
    open('http://localhost:2893/');
  }, 1000);
}

printLog();
