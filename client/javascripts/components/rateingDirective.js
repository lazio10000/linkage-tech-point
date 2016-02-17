'use strict';
angular.module('com.linkage.tech').directive('rateingDirective', function() { 
	return {
      restrict: 'AE', 
	  scope: {subject:'='},
      templateUrl: '/partials/rating.html',
	  controllerAs: 'pk',
	  controller:function rateingController(){
		var vm = this;
		vm.points = [];  
		var points = 0;
		vm.rating = function(point){  
			vm.points.push(point); 
			points = points + point;
			vm.subject.point = (points /vm.points.length).toFixed(2); 
		};
		return vm;
	  },
	  bindToController: true 
    }; 
});