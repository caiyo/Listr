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
		
		service.addUserToGroup = function(){
			
		};
		
		return service;
	};
	var module = angular.module("listr");
	module.factory("ListrService", listr);
}());