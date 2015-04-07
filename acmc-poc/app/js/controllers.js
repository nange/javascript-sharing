'use strict';

var pocController = angular.module('pocController', []);

pocController.controller('searchCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.show = false;
	$scope.searchParams = {
		searchType: 'user',
		searchFields: [],
		start: 0,
		end: 10,
		'#class': 'acp.search.bean.SearchRequest'
	};

	function getMetaInfo() {
		$http
		.post('/securerest/acp/search/util/JsonData/getFormInfoByType', '\"user\"')
		.success(function(data) {
			var fields = data.result.fields;
			fields.forEach(function(value, index) {
				$scope.searchParams.searchFields.push({
					name: value.name,
					value: '',
					action: value.defaultAction.name
				});
			});

			$scope.form = data.result;
		});
	}
	getMetaInfo();

	$scope.search = function() {
		$http
		.post('/securerest/acp/search/RESTSearch', $scope.searchParams)
		.success(function(data) {
			console.log(data);
			if (data.success) {
				$scope.results = data.result;
				$scope.show = true;
			}
		});
	};

	$scope.sortUp = function(name) {
		// $scope.searchParams.orderByField = {
		// 	sortByDesc: 
		// };

		$scope.row = name;
	}

	$scope.sortDown = function(name) {
		$scope.row = '-' + name;
	}

	$scope.reset = function() {
		$scope.show = false;
	};

}]);
