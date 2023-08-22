const { Notification } = require('node-notifier');

new Notification().notify({
  title: '✅ 准备发布到 npm',
  message: '测试用例执行完毕，马上就要输入 npm 校验码了！',
  sound: true,
});

process.exit(0);
