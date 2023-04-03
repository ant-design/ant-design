const notifier = require('node-notifier');

notifier.notify({
  title: '准备发布到 npm',
  message: '测试用例执行完毕，请切回命令行输入 npm 二阶段校验码',
  sound: true,
});
