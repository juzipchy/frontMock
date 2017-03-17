var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

const dataBaseName = 'mockProject'
// Connection URL 
var url = 'mongodb://localhost:27017/' + dataBaseName;
// Use connect method to connect to the Server 


function connectToDb(action=()=>{}, callback=()=>{}){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  action(db, callback);
	});
}

module.exports = connectToDb;