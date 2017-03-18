const assert = require('assert'),
	connect = require('./index')

function query(query={}, callback=(data)=>{}) {

	var findDocuments = function(db) {
	  // Get the documents collection 
	  var collection = db.collection('documents');
	  // Find some documents 
	  collection.find(query).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    callback(docs);
	    db.close();
	  });
	}

	connect(findDocuments, function(result){
		console.log(result);
	});
}

module.exports = query;