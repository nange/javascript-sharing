angular
.module('pocController', [])
.controller('searchCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.show = false;
	$scope.pagination = {
		percount: 10

	};
	$scope.searchParams = {
		searchType: 'user',
		searchFields: [],
		start: 0,
		end: 10,
		'#class': 'acp.search.bean.SearchRequest'
	};

	function getMetaInfo() {
		$http
			.get('/app/backend/field.json')
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
			.get('/app/backend/result.json', $scope.searchParams)
			.success(function(data) {
				console.log(data);
				if (data.success) {
					$scope.results = data.result;
					$scope.show = true;
				}
			});
	};

	$scope.sortUp = function(name) {
		$http
			.get('/app/backend/result.json', $scope.searchParams)
			.success(function(data) {
				console.log(data);
				if (data.success) {
					$scope.results = data.result;
					$scope.show = true;
					$scope.row = name;
				}
			});
	};

	$scope.sortDown = function(name) {
		$http
			.get('/app/backend/result.json', $scope.searchParams)
			.success(function(data) {
				console.log(data);
				if (data.success) {
					$scope.results = data.result;
					$scope.show = true;
					$scope.row = '-' + name;
				}
			});
	};

	$scope.reset = function() {
		$scope.show = false;
	};

}]);
