const OSS = require('ali-oss');

async function uploadFile() {
  const client = new OSS({
    endpoint: 'oss-cn-shanghai.aliyuncs.com',
    accessKeyId: process.env.ALI_OSS_AK_ID,
    accessKeySecret: process.env.ALI_OSS_AK_SECRET,
    bucket: 'antd-visual-diff',
  });

  const headers = {
    'x-oss-object-acl': 'public-read',
    'x-oss-forbid-overwrite': 'false',
    'Content-Disposition': 'inline',
    'Content-Type': 'image/png',
  };
  // https://antd-visual-diff.oss-cn-shanghai.aliyuncs.com/pr-47859/visualRegressionReport/images/current/menu-sider-current.compact.png
  try {
    const r1 = await client.put(`demo/image`, 'demo.png', {
      headers,
      timeout: 60000 * 2,
    });
    console.log('r1', r1);
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

uploadFile();
