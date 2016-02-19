angular.module('com.linkage.tech', ['ui.router','ngAnimate','ui.bootstrap'])
  .config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.when("", "/");
 
    $stateProvider.state('home',{
		url :'/',
		templateUrl: './partials/users.html',
		controller: 'UserController as users' 
	}).state('techPk',{
		url :'/techPk',
		templateUrl: './partials/techPk.html',
		controller: 'TechPkController as pk' 
	}).state('techShareList',{
		url :'/techShareList',
		templateUrl: './partials/techShareList.html',
		controller: 'TechShareListController as list' 
	}).state('about',{
		url :'/about',
		templateUrl: './partials/about.html'
	}); 
	$urlRouterProvider.otherwise('/');  
  }).run(function($rootScope,authService,$state){ 
    $rootScope.$on("$stateChangeStart", function(event, state, params) {
		  
		if(state.url === '/techPk'){
		   var pwd = prompt("请输入密码",""); 
		   var isAuth;
		   var ss = authService.login(pwd).then(function(){},function(){$state.go('home'); }); 
		} 
	});
});