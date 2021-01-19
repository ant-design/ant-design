/* eslint-disable no-await-in-loop no-console */
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');
const axios = require('axios');

const { GH_TOKEN: ghToken, DD_TOKEN: ddToken } = process.env;

const octokit = new Octokit({ auth: `token ${ghToken}` });

// 发布多个使用
const branches = ['master'];

function getChangelog(content, version) {
  const lines = content.split('\n');
  const changeLog = [];
  const startPattern = new RegExp(`^## ${version}`);
  const stopPattern = /^## /; // 前一个版本
  const skipPattern = /^`/; // 日期
  let begin = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (begin && stopPattern.test(line)) {
      break;
    }
    if (begin && line && !skipPattern.test(line)) {
      changeLog.push(line);
    }
    if (!begin) {
      begin = startPattern.test(line);
    }
  }
  return changeLog.join('\n');
}

async function main() {
  try {
    const { owner, repo } = github.context.repo;
    const { ref_type: refType, ref: version } = github.context.payload;

    if (owner !== 'ant-design' || repo !== 'ant-design') {
      return false;
    }

    if (refType !== 'tag') {
      return false;
    }

    let enChangelog = '';
    let cnChangelog = '';

    for (let i = 0; i < branches.length; i += 1) {
      const url = `https://raw.githubusercontent.com/ant-design/ant-design/${branches[i]}/`;
      const enChangelogContent = await axios.get(`${url}/CHANGELOG.en-US.md`);
      enChangelog = enChangelog || getChangelog(enChangelogContent.data, version);
      const cnChangelogContent = await axios.get(`${url}/CHANGELOG.zh-CN.md`);
      cnChangelog = cnChangelog || getChangelog(cnChangelogContent.data, version);
    }

    const changelog = [enChangelog, '\n', '---', '\n', cnChangelog].join('\n');

    try {
      await octokit.repos.createRelease({
        owner,
        repo,
        tag_name: version,
        name: version,
        body: changelog,
      });

      if (cnChangelog) {
        axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${ddToken}`, {
          msgtype: 'markdown',
          markdown: {
            title: `${version} 发布日志`,
            text: `# ${version} 发布日志 \n\n ${cnChangelog}`,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

main();
