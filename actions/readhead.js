const fs = require('fs');
const path = require('path')
const glob = require('glob')

var getEntry = function(globPath) {
    var entries = {};
    glob.sync(globPath).forEach(function(entry) {
        var pathname = entry.split('/').splice(-2)[0];
        entries[pathname] = entry;
    });
    return entries;
};

const entries = getEntry('/home/mi/workspace/mqsas/src/components/**/index.js')
const reg = /\/\*\*\@wiki((?:.|\n)*?)\@wiki\*\*\// //匹配wiki

const names = Object.keys(entries);


names.map((name) => {
  let content = fs.readFileSync(entries[name]).toString();
  console.log(content);

  let result = reg.exec(content);
  if(!result) {
    return;
  }

  const wikiString = result[1];

  fs.writeFile(path.join(__dirname, './../wikis/'+ name +'.md'),
    wikiString,
    (err, result)=>{
  });

})
// console.log(entries);

// let content = fs.readFileSync('./test.readhead.js').toString();
