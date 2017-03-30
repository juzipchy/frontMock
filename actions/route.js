var schedule = require('node-schedule')

var date = new Date(30, 28, 16);
 
var j = schedule.scheduleJob('/2 * * * * *', function(){
  console.log(new Date());
});