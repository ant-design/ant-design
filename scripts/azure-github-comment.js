const fetch = require('node-fetch');

const REPO = process.env.ACCESS_REPO;
const TOKEN = process.env.ACCESS_TOKEN;
const PR = process.env.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER;
const REPLACE_MARK = '<!-- AZURE_UPDATE_COMMENT -->';

const argv = process.argv;

const comment = argv[argv.length - 1];

const wrappedComment = `
  ${REPLACE_MARK}
  ${comment}
`.trim();

async function withGithub(url, json, method) {
  const res = await fetch(url, {
    method: method || (json ? 'POST' : 'GET'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(TOKEN).toString('base64')}`,
    },
    body: json ? JSON.stringify(json) : undefined,
  });

  return res.json();
}

(async function run() {
  const comments = await withGithub(`https://api.github.com/repos/${REPO}/issues/${PR}/comments`);

  // Find my comment
  const updateComment = comments.find(({ body }) => body.includes(REPLACE_MARK));
  // eslint-disable-next-line no-console
  console.log('Origin comment:', updateComment);

  // Update
  let res;
  if (!updateComment) {
    res = await withGithub(`https://api.github.com/repos/${REPO}/issues/${PR}/comments`, {
      body: wrappedComment,
    });
  } else {
    res = await withGithub(
      `https://api.github.com/repos/${REPO}/issues/comments/${updateComment.id}`,
      {
        body: wrappedComment,
      },
      'PATCH',
    );
  }

  // eslint-disable-next-line no-console
  console.log(res);
})();
