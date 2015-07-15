function runCmd(cmd, args, fn) {
  args = args || [];
  var runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: "inherit"
  });
  runner.on('close', function (code) {
    if (fn) {
      fn(code);
    }
  });
}

runCmd('which', ['tnpm'], function (code) {
  var npm = 'npm';
  if (!code) {
    npm = 'tnpm';
  }
  console.log(npm + ' installing');
  runCmd(npm, ['install'], function () {
    console.log(npm + ' install end');
  });
});