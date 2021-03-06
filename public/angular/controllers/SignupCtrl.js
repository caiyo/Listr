(function(){
	var module = angular.module("listr");

	var SignupCtrl = function($scope, $controller, AuthenticationService,$location, InitialDataLoad){
		$scope.signup = function(username, name, email, password, confirmPassword){
			console.log("Signing up user");
			AuthenticationService.signup(username, name, email, password, confirmPassword, 
					function(data,status){
						if(status==200)
							AuthenticationService.login(username, password, function(data,status) {
								if(status == 200){
									AuthenticationService.setCredentials(data);
									InitialDataLoad.loadData();
									$scope.username=null;
									$scope.name=null;
									$scope.email=null;
									$scope.password=null;
									$scope.confirmPassword=null;
									$scope.error=null;
									$location.path("/");
								}
								else{
									console.log("error logging in");
								}
							});
						else{
							console.log(data);
							$scope.error=data;
							console.log("Error signing up");
						}
			});
		}
	};
	module.controller("SignupCtrl", SignupCtrl);
}());
