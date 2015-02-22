(function(){

	var listr = function($rootScope, $http, $cookies){
		var service = {};
		
		service.getGroups = function(callback){
			$http({
				method: "GET",
				url: "/api/groups",
			})
			.success(function(data, status){
				callback(data,status);
			});
			
		};
		
		return service;
	};
	var module = angular.module("listr");
	module.factory("ListrService", listr);
}());