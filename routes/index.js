(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var mongoHost = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
  var mongoPort = process.env.MONGODB_PORT_27017_TCP_PORT || 27017;
  var mongoDatabase = process.env.MONGODB_INSTANCE_NAME || 'LinkageTechShare';
  var mongoUsername = process.env.MONGODB_USERNAME;
  var mongoPassword = process.env.MONGODB_PASSWORD;
  var mongoUrl =  mongoHost + ":" + mongoPort.toString() + "/" + mongoDatabase;
  if(mongoUsername){
	mongoUrl = mongoUsername + ":" + mongoPassword + "@" + mongoUrl;
  }
  var db = mongojs(mongoUrl, ['techShare','Users','PointsHistory']);
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
  
  router.get('/api/users', function(req, res) {
	 db.Users.find().sort({'user_no': 1}, function (err, data) {
       res.json(data);
	});
  });
  
  router.get('/api/points/*', function(req, res) {
	 db.PointsHistory.find({user_no:req.query.user_no},  function (err, data) {
       res.json(data);
	});
  });
 
  router.get('/api/techShare', function(req, res) {
    db.techShare.find().sort({shareDate: -1}, function (err, data) {
       res.json(data);
	});
  });
 
  router.post('/api/techShare', function(req, res) {
    var techShare =  req.body;
	var user_no = techShare.user.user_no;
	var user_point = techShare.user.points;
	techShare.user = techShare.user.name; 
	var operTime = new Date();
	db.Users.update({'user_no':user_no},{$set:{'points':user_point + techShare.point}});
	db.PointsHistory.insert({'user_no':user_no,'points':techShare.point,'operateTime':operTime,'pointType':'技术分享'});
    db.techShare.insert(techShare, function(err, data) { 
      res.json(data);
    });
 
  });
 
  router.post('/api/login', function(req, res) { 
	  if(req.body.pwd !== 'linkage'){
		 res.status(401).end();
	  }
	  else{
		res.send({ msg: 'OK' }); 
	  }
  });
 
  module.exports = router;
 
}());