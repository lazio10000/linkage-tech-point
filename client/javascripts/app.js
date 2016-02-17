angular.module('com.linkage.tech', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
	    templateUrl: '/partials/techShareList.html',
        controller: 'TechShareListController',
		controllerAs: 'list'
       
      })
	  .when('/techPk', {
        templateUrl: '/partials/techPk.html',
        controller: 'TechPkController',
		controllerAs: 'pk'
      })
	  .otherwise({
        redirectTo: '/'
      });
  });