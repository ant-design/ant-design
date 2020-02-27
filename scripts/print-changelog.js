/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const chalk = require('chalk');
const jsdom = require('jsdom');
const jQuery = require('jquery');
const fetch = require('node-fetch');
const simpleGit = require('simple-git/promise');

const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM('').window;
global.document = document;

const $ = jQuery(window);

const QUERY_TITLE = '.gh-header-title .js-issue-title';
const QUERY_DESCRIPTION_LINES = '.comment-body table tbody tr';
const QUERY_AUTHOR = '.timeline-comment-header-text .author:first';
const MAINTAINERS = ['zombiej', 'afc163', 'chenshuai2144'];

const fromVersion = process.argv[process.argv.length - 2];
const toVersion = process.argv[process.argv.length - 1];
const cwd = process.cwd();
const git = simpleGit(cwd);

function getDescription(row = '') {
  return row
    .trim()
    .replace('🇺🇸 English', '')
    .replace('🇨🇳 Chinese', '')
    .trim();
}

async function printLog() {
  if (!/\d+\.\d+\.\d+/.test(fromVersion)) {
    console.log(
      chalk.red(
        '🤪 Not pass validate tags. Please execute like `print-changelog.js 3.26.0 master` instead.',
      ),
    );
  }

  const logs = await git.log({ from: fromVersion, to: toVersion });

  let prList = [];

  for (let i = 0; i < logs.all.length; i += 1) {
    const { message, body, hash } = logs.all[i];

    const text = `${message} ${body}`;

    const match = text.match(/#\d+/g);
    const prs = (match || []).map(pr => pr.slice(1));
    const validatePRs = [];

    console.log(
      `[${i + 1}/${logs.all.length}]`,
      hash.slice(0, 6),
      '-',
      prs.length ? prs.map(pr => `#${pr}`).join(',') : '?',
    );
    for (let j = 0; j < prs.length; j += 1) {
      const pr = prs[j];

      // Use jquery to get full html page since it don't need auth token
      const res = await fetch(`https://github.com/ant-design/ant-design/pull/${pr}`);
      if (res.url.includes('/issues/')) {
        continue;
      }

      const html = await res.text();

      const $html = $(html);

      const prTitle = $html
        .find(QUERY_TITLE)
        .text()
        .trim();
      const prAuthor = $html
        .find(QUERY_AUTHOR)
        .text()
        .trim();
      const prLines = $html.find(QUERY_DESCRIPTION_LINES);

      const lines = [];
      prLines.each(function getDesc() {
        lines.push(
          $(this)
            .text()
            .trim(),
        );
      });

      const english = getDescription(lines.find(line => line.includes('🇺🇸 English')));
      const chinese = getDescription(lines.find(line => line.includes('🇨🇳 Chinese')));

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
      });
    }
  }

  console.log('\n', chalk.green('Done. Here is the log:'));

  function printPR(lang, postLang) {
    prList.forEach(entity => {
      const { pr, author, hash, title } = entity;
      if (pr) {
        const str = postLang(entity[lang]);
        let icon = '';
        if (str.toLowerCase().includes('fix') || str.includes('修复')) {
          icon = '🐞';
        }

        let authorText = '';
        if (!MAINTAINERS.includes(author)) {
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
  console.log(chalk.yellow('Chinese changelog:'));
  printPR('chinese', chinese => (chinese[chinese.length - 1] === '。' ? chinese : `${chinese}。`));

  console.log('\n-----\n');

  // English
  console.log(chalk.yellow('English changelog:'));
  printPR('english', english => {
    english = english.trim();
    if (english[english.length - 1] !== '.') {
      english = `${english}.`;
    }
    return `${english} `;
  });
}

printLog();
/* eslint-enable */
