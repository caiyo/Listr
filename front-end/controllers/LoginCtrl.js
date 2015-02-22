(function(){
	var module = angular.module("listr");

	var LoginCtrl = function($scope, AuthenticationService){
		$scope.login=function(){
			console.log("Logging in");
			AuthenticationService.login($scope.username, $scope.password, function(data, status, header, statusText) {

				if(status == 200){
					AuthenticationService.setCredentials(data, status, header, statusText);
				}
				else{
					alert("error logging in");
				}
			});
		};

	};
	module.controller("LoginCtrl", LoginCtrl);
}());
