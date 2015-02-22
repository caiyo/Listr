(function(){

	var authentication = function($rootScope, $http, $cookies){
		var service = {};

		service.login = function(username, password, callback){
      console.log("calling http method");
      $http({
        method: "POST",
        url: "http://localhost:9000/login",
        data : {
                userName:username,
                password: password
                }
        //withCredentials : true
      })
			//$http.post("http://localhost:9000/login", {userName: username, password: password})
				.success(function(data, status, header, config, statusText){
          console.log("cookies: " + document.cookie)
          console.log("data: " + data);
          console.log("status: " + status);
          console.log("Keys: " + Object.keys(header));
          console.log(config.headers);
          console.log("Status: " + statusText);
          console.log(Object.keys($cookies));
					callback(data, status, header, statusText);
				});
		};
			
		service.setCredentials = function(data){
      console.log("setting credentials");
		}

		return service;
	};
	var module = angular.module("listr");
	module.factory("AuthenticationService", authentication);
}());