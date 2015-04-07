angular
.module('pocModule', ['ngRoute', 'pocController'])
.config(['$routeProvider', function($routeProvider) {
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
