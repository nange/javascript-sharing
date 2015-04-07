'use strict';

//var pocModule = angular.module('pocModule', ['ngRoute', 'pocController']);

var pocModule = angular.module('pocModule', ['ngRoute', 'pocController']);


pocModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/app/views/search.html',
        	controller: 'searchCtrl'
		})
		.otherwise({
			templateUrl: '/securerest/acp/search/RESTSearch',
        	controller: 'searchCtrl'
		});
}]);

