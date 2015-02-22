(function(){

	var authentication = function($rootScope, $http, $cookies){
		var service = {};

		service.login = function(username, password, callback){
			$http({
				method: "POST",
				url: "/login",
				data : {
					userName:username,
					password: password
                }
			})
			.success(function(data, status){
				callback(data,status);
			});
		};
		
		
		service.setCredentials = function(data){
			$rootScope.user=data;
		};
		service.signup = function(username, name, password, confirmPassword, callback){
			$http({
				method: "POST",
				url: "/signup",
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