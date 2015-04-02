'use strict';

var pocController = angular.module('pocController', []);

pocController.controller('searchUserCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.show = false;
	$scope.order = null;

	$scope.search = function() {
		$http.post('backend/searchuser.json', $scope.user)
			.success(function(data) {
				$scope.results = data;
				$scope.show = true;
			});
	};

	$scope.reset = function() {
		$scope.user = null;
		$scope.show = false;
	};

	$scope.order = function(col) {
		if (col === 'userno') {
			$scope.order = 'userno';
			$scope.row = 'userno';
		} else if (col === '-userno') {
			$scope.order = '-userno';
			$scope.row = '-userno';
		}
	};
}]);


