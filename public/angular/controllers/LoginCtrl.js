(function(){
	var module = angular.module("listr");
	var LoginCtrl = function($scope,$location,$cookies, AuthenticationService){
		console.log("insid controler");
		$scope.login=function(username, password){
			console.log("Logging in");
			AuthenticationService.login(username, password, function(data,status) {
				if(status == 200){
					AuthenticationService.setCredentials(data);
				}
				else{
					alert("error logging in");
				}
			});
		};

	};
	module.controller("LoginCtrl", LoginCtrl);
}());
