const connectToDb = require('./index'),
  _ = require('lodash'),
  assert = require('assert')

const getRoutes = require('../route/get'),
      postRoutes = require('../route/post')

function insert(insertData, name = "documents", callback = (data) => {}) {

  connectToDb(function(db) {
    // Get the documents collection 
    var collection = db.collection(name);
    // Insert some documents 
    collection.insertMany([insertData], function(err, result) {

      console.log("Inserted 3 documents into the document collection");

      db.close();

      callback(result);
    });
  });
}


function makeDocument(path = '', type = '', querys = [], results = {}) {
  return {
    path: path,
    type: type,
    querys: querys,
    results: results
  }
}

module.exports = insert;

// _.map(getRoutes, (value, name)=>{
//   let doc = makeDocument(name, 'get', [], require(`../data/${value}.json` ));
//   insert(doc, 'documents' , function(result){
//   });
// });

// _.map(postRoutes, (value, name)=>{
//   let doc = makeDocument(name, 'post', [], require(`../data/${value}.json` ));
//   insert(doc, 'documents', function(result){
//   });
// });