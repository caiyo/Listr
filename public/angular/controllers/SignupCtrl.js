(function(){
	var module = angular.module("listr");

	var SignupCtrl = function($scope, $controller, AuthenticationService){
		$scope.signup = function(username, name, password, confirmPassword){
			console.log("Signing up user");
			AuthenticationService.signup(username, name, password, confirmPassword, 
					function(data,status){
						if(status==200)
							AuthenticationService.login(username, password, function(data,status) {
								if(status == 200){
									AuthenticationService.setCredentials(data);
								}
								else{
									alert("error logging in");
								}
							});
						else{
							console.log("Error signing up");
						}
			});
		}
	};
	module.controller("SignupCtrl", SignupCtrl);
}());