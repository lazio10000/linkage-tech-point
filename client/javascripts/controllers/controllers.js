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
}).controller('UserController', function(techShareFactory,$uibModal) {
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
	console.log( items.data);
		$scope.items = items.data;  
	
});
