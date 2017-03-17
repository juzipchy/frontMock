const connectToDb = require('./index'),
  assert = require('assert')

function insert(name = "documents", insertData, callback = () => {}) {

  connectToDb(function(db, callback) {
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

insert('documents', {a:2343}, function(result){
  console.log(result,'xiong')
})