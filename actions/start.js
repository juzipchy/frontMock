var exec = require('child_process').exec;
var cmd = 'sudo http-server';
exec(cmd, function(error, stdout, stderr) {
  console.log('test1')
});
