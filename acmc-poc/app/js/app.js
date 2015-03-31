'use strict';

//var pocModule = angular.module('pocModule', ['ngRoute', 'pocController']);

var pocModule = angular.module('pocModule', ['ngRoute', 'pocController']);


pocModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'tpl/userSearch.jsp',
        	controller: 'searchUserCtrl'
		})
		.otherwise({
			templateUrl: 'tpl/userSearch.jsp',
        	controller: 'searchUserCtrl'
		});
}]);

