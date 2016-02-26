'use strict';
angular.module('com.linkage.tech' ).controller('TechPkController', function(techShareFactory,$location) {
  var vm = this;  
  vm.Users = []; 
  var now = new Date(); 
  vm.techShareA = {point :0,shareDate:now}; 
  vm.techShareB = {point :0,shareDate:now}; 
  
  techShareFactory.getUsers().then(function(data) {
    vm.Users = data.data;
  }); 
    
  vm.save = function() {  
	  vm.techShareA.point = parseFloat(vm.techShareA.point);
	  vm.techShareB.point = parseFloat(vm.techShareB.point);
      techShareFactory.saveTechShare(vm.techShareA).then(techShareFactory.saveTechShare(vm.techShareB)).then($location.path('/TechShareList'));  
  };
   
  return vm;
}).controller('TechShareListController', function(techShareFactory,$window) {
  var vm = this;  
  vm.techShareList = [];   
  techShareFactory.getTechShareList().then(function(data) {
    vm.techShareList = data.data;
  }); 
  
  vm.showDetail = function(link){
	if(link) { 
		$window.location.href = link;
	}
  };
   
  return vm;
}).controller('UsersController', function(techShareFactory,$uibModal) {
  var vm = this;   
  vm.Users = [];   
  techShareFactory.getUsers().then(function(data) {
    vm.Users = data.data;
  }); 
  
  vm.open = function (user) { 
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'points.html',
      controller: 'PointsController',  
	  resolve: {
         items: function () {
           return techShareFactory.getPoints(user);
        }
      } 
    }); 
  }; 
  return vm;
}).controller('PointsController', function ($scope, $uibModalInstance, items) { 
		$scope.items = items.data;  
	
}).controller('UserController', function (techShareFactory,$stateParams,$location,$timeout) { 
	var vm = this; 
	vm.alerts = [];
	vm.user = {};
	techShareFactory.getUser($stateParams.id).then(function(data) { 
		vm.user = data.data[0];
	}); 
	vm.submit = function(){
		techShareFactory.updateUser(vm.user).then(function(){
			vm.alerts.push({msg: '保存成功'});
			$timeout(function(){$location.path('/')}, 3000);
		});
	};
});
