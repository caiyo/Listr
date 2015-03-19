(function(){

	var authentication = function($rootScope, $http, ListrService, GroupProvider){
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
			}).error(function(data,status){
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
		
		
		service.setCredentials = function(user){
			$rootScope.user=user;
			//gets group data for sidebar
			ListrService.getGroups(function(data, status){
				if(status == 200){
					console.log(data);
					GroupProvider.setGroups(data);
				}
			});
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
		service.signup = function(username, name, email, password, confirmPassword, callback){
			$http({
				method: "POST",
				url: "/api/signup",
				data : {
					userName:username,
					email: email,
					password: password,
					confirmPassword: confirmPassword,
					name: name
                }
			})
			.success(function(data, status){
				callback(data,status);
			}).error(function(data,status){
				callback(data,status);
			});	
		};
			
		
		
		return service;
	};
	var module = angular.module("listr");
	module.factory("AuthenticationService", authentication);
}());