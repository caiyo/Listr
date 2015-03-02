(function(){

	var authentication = function($rootScope, $http){
		var service = {};

		service.login = function(username, password, callback){
			$http({
				method: "POST",
				url: "/api/login",
				data : {
					userName:username,
					password: password
                }
			})
			.success(function(data, status){
				callback(data,status);
			});
		};
		
		service.logout = function(callback){
			$http({
				method: "POST",
				url: "/api/logout"
			})
			.success(function(data, status){
				callback(data,status);
			});
		};
		
		
		service.setCredentials = function(data){
			$rootScope.user=data;
		};
		
		service.getCredentials = function(callback){
			$http({
				method: "GET",
				url: "/api/user",
			})
			.success(function(data, status){
				callback(data,status);
			}).error(function(data,status){
				callback(data,status);
			});	
		
				
			return $rootScope.user;
		};
		service.signup = function(username, name, password, confirmPassword, callback){
			$http({
				method: "POST",
				url: "/api/signup",
				data : {
					userName:username,
					password: password,
					confirmPassword: confirmPassword,
					name: name
                }
			})
			.success(function(data, status){
				callback(data,status);
			});
		};
			
		
		
		return service;
	};
	var module = angular.module("listr");
	module.factory("AuthenticationService", authentication);
}());