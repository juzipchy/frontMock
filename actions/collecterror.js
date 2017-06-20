const fs = require('fs');
const shell = require('shelljs');
const path = require('path')
const colors = require('../conf/colors')

const getRoutes = require('../route/get.json')
const postRoutes = require('../route/post.json')

module.exports = function(req, res, next) {
	let params = req.body;
	const {url,errorMessage, scriptURI, lineNumber,columnNumber,errorObj} = params;
  console.log({url,errorMessage, scriptURI, lineNumber,columnNumber,errorObj});

  res.send({status: true, data: {url,errorMessage, scriptURI, lineNumber,columnNumber,errorObj}})
}
