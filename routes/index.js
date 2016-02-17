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
  var db = mongojs(mongoUrl, ['techShare','Users']);
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
  
  router.get('/api/users', function(req, res) {
	 db.Users.find(function(err, data) {
      res.json(data);
    });
  });
 
  router.get('/api/techShare', function(req, res) {
    db.techShare.find().sort({shareDate: -1}, function (err, data) {
       res.json(data);
	});
  });
 
  router.post('/api/techShare', function(req, res) {
    db.techShare.insert(req.body, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.put('/api/todos', function(req, res) {
 
    db.todos.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.delete('/api/todos/:_id', function(req, res) {
    db.todos.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });
 
  });
 
  module.exports = router;
 
}());