'use strict';
angular.module('com.linkage.tech').controller('TechPkController', function(techShareFactory,$location) {
  var vm = this;  
  vm.Users = []; 
  var now = new Date(); 
  vm.techShareA = {point :0,shareDate:now}; 
  vm.techShareB = {point :0,shareDate:now}; 
  
  techShareFactory.getUsers().then(function(data) {
    vm.Users = data.data;
  }); 
    
  vm.save = function() { 
	  vm.techShareA.user = vm.techShareA.user.name;
	  vm.techShareB.user = vm.techShareB.user.name;
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
  }
   
  return vm;
});;