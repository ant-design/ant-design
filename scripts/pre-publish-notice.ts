const { Notification: Notifier } = require('node-notifier');

new Notifier().notify({
  title: '✅ 准备发布到 npm',
  message: '测试用例执行完毕，快回来输入 npm 校验码了！',
  sound: 'Crystal',
});

process.exit(0);
