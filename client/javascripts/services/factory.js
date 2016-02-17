angular.module('com.linkage.tech').factory('techShareFactory', function($http) {
  var urlBase = '/api/techShare';
  var _techShareService = {};
 
  _techShareService.getTechShareList = function() {
    return $http.get(urlBase);
  };
  
  _techShareService.getUsers = function() {
    return $http.get('/api/users');
  };
 
  _techShareService.saveTechShare = function(todo) {
    return $http.post(urlBase, todo);
  };
 
  _techShareService.updateTodo = function(todo) {
    return $http.put(urlBase, todo);
  };
 
  _techShareService.deleteTodo = function(id) {
    return $http.delete(urlBase + '/' + id);
  };
 
  return _techShareService;
});