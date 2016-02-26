angular.module('com.linkage.tech').factory('techShareFactory', function($http) {
  var urlBase = '/api/techShare';
  var _techShareService = {};
 
  _techShareService.getTechShareList = function() {
    return $http.get(urlBase);
  };
  
  _techShareService.getUsers = function() {
    return $http.get('/api/users');
  };
  
  _techShareService.getUser = function(userid) {
    return $http.get('/api/users/' + userid);
  };
  
  _techShareService.updateUser = function(user) {
    return $http.put('/api/users',user);
  };
  
  _techShareService.getPoints = function(user) {
    return $http.get('/api/points/?user_no=' + user);
  };
 
  _techShareService.saveTechShare = function(techShare) {
    return $http.post(urlBase, techShare);
  }; 
  
  return _techShareService;
}).factory('authService', function($http) {
     var _authService = {};
	 _authService.login = function (pwd) {
		return  $http.post('/api/login',{'pwd':pwd});
     }; 
     return _authService;

});