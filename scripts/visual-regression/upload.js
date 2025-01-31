// Attention: use all node builtin modules except `ali-oss`
// Must keep our ak/sk safe

const OSS = require('ali-oss');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

// node scripts/visual-regression/upload.js ./visualRegressionReport.tar.gz --ref=pr-id
// node scripts/visual-regression/upload.js ./imageSnapshots.tar.gz --ref=master-commitId

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/visual-regression/upload.js <tarFilePath> --ref=<refValue>');
  process.exit(1);
}

const ALI_OSS_BUCKET = 'antd-visual-diff';

function retry(promise, retries, delay = 3000) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      promise.then(resolve).catch((error) => {
        if (retries > 0) {
          setTimeout(() => {
            attempt();
          }, delay);
          retries--;
        } else {
          reject(error);
        }
      });
    };

    attempt();
  });
}

/**
 * Extract the tar file path and ref value from the cli arguments
 * @param {string[]} cliArgs
 */
function parseArgs(cliArgs) {
  const filepath = cliArgs[0];
  let refValue = '';

  for (let i = 1; i < cliArgs.length; i++) {
    if (cliArgs[i].startsWith('--ref=')) {
      refValue = cliArgs[i].substring(6);
      break;
    }
  }

  assert(filepath, 'filepath is required');
  assert(refValue, 'refValue is required');

  return [filepath, refValue];
}

async function walkDir(dirPath) {
  const fileList = [];

  const files = await fs.promises.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      // Recursively call this func for subdirs

      fileList.push(...(await walkDir(filePath)));
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 *
 * @param {import('ali-oss')} client
 * @param {*} filePath
 * @param {*} refValue
 */
async function uploadFile(client, filePath, refValue) {
  const headers = {
    // https://help.aliyun.com/zh/oss/user-guide/object-acl
    'x-oss-object-acl': 'public-read',
    // https://help.aliyun.com/zh/oss/developer-reference/prevent-objects-from-being-overwritten-by-objects-that-have-the-same-names-3
    'x-oss-forbid-overwrite': 'false',
    'Content-Disposition': 'inline',
  };
  // Set content-type to allow individual preview of images
  if (path.extname(filePath) === '.png') {
    headers['Content-Type'] = 'image/png';
  }

  console.log('Uploading file: %s', filePath);
  try {
    const targetFilePath = path.relative(process.cwd(), filePath);
    const r1 = await client.put(`${refValue}/${targetFilePath}`, filePath, {
      headers,
      timeout: 60000 * 2,
    });
    console.log('Uploading file successfully: %s', r1.name);
  } catch (err) {
    console.error('Uploading file failed: %s', err);
    throw err;
  }
}

async function boot() {
  const [fileOrFolderName, refValue] = parseArgs(args);

  // check if exists
  const workspacePath = path.resolve(process.cwd(), fileOrFolderName);

  if (!fs.existsSync(workspacePath)) {
    console.error('File not exists: %s', workspacePath);
    process.exit(1);
  }

  const client = new OSS({
    endpoint: 'oss-accelerate.aliyuncs.com',
    accessKeyId: process.env.ALI_OSS_AK_ID,
    accessKeySecret: process.env.ALI_OSS_AK_SECRET,
    bucket: ALI_OSS_BUCKET,
  });

  // if is a file then upload it directly
  const stat = fs.statSync(workspacePath);
  if (stat.isFile()) {
    const doUpload = uploadFile(client, workspacePath, refValue);
    try {
      await retry(doUpload, 3);
    } catch (err) {
      console.error(
        'Uploading file `%s` failed after retry %s, error: %s',
        fileOrFolderName,
        3,
        err,
      );
      process.exit(1);
    }
    return;
  }

  if (stat.isDirectory()) {
    const fileList = await walkDir(workspacePath);
    for (const file of fileList) {
      const doUpload = uploadFile(client, file, refValue);
      try {
        await retry(doUpload, 3);
      } catch (err) {
        console.warn(
          'Skip uploading file `%s` in folder `%s` failed after retry %s, error: %s',
          path.relative(workspacePath, file),
          fileOrFolderName,
          3,
          err,
        );
      }
    }
  }
}

boot();
