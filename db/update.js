
const connectToDb = require('./index'),
  assert = require('assert')


function update(query={}, updataData={}, callback = (data) => {}, name = "documents") {

  connectToDb(function(db) {
    // Get the documents collection 
    var collection = db.collection(name);
    // Insert some documents 
    collection.updateOne(query, { $set: updataData}, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      db.close();
      callback(result);
    });
  });
}


module.exports = update;