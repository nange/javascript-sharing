'use strict';

var pocController = angular.module('pocController', []);

pocController.controller('searchCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.show = false;
	// $scope.searchData = {
	// 	searchType: 'user',
	// 	searchFields: [
	// 		{
	// 			name: 'profileId',
	// 			value: ''
	// 		},
	// 		{
	// 			name: 'email',
	// 			value: ''
	// 		},
	// 		{
	// 			name: 'firstName',
	// 			value: ''
	// 		},
	// 		{
	// 			name: 'lastName',
	// 			value: ''
	// 		},
	// 		{
	// 			name: 'companyName',
	// 			value: ''
	// 		},
	// 		{
	// 			name: 'level',
	// 			value: ''
	// 		}
	// 	],
	// 	start: 0,
	// 	end: 10,
	// 	'$class': 'acp.search.bean.SearchRequest'
	// };
	$scope.searchData = {
	   "searchType":"user",
	   "searchFields":[
	      {
	         "name":"email",
	         "value":"@",
	         "action":"contains"
	      }
	   ],
	   "start":0,
	   "end":2,
	   "returnFields":[
	      {
	         "name":"firstName"
	      },
	      {
	         "name":"lastName"
	      },
	      {
	         "name":"email"
	      },
	      {
	         "name":"profileId"
	      },
	      {
	         "name":"age"
	      },
	      {
	         "name":"birthDay"
	      },
	      {
	         "name":"auto_login"
	      }
	   ],
	   "$class":"acp.search.bean.SearchRequest"
	}

	$scope.search = function() {
		$http
		.post('/securerest/acp/search/RESTSearch', $scope.searchData)
		.success(function(data) {
			if (data.success) {
				$scope.results = data.result.results;
				$scope.show = true;
			}
		});
	};

	$scope.reset = function() {
		$scope.user = null;
		$scope.show = false;
	};

}]);
