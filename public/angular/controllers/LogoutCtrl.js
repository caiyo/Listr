(function(){
	var module = angular.module("listr");
	var LogoutCtrl = function($scope, $rootScope, AuthenticationService){

		$scope.logout=function(){
			console.log("Logging out");
			AuthenticationService.logout(function(data,status) {
				if(status == 200){
					$rootScope.user = null;
				}
				else{
					alert("error logging out");
				}
			});
		};

	};
	module.controller("LogoutCtrl", LogoutCtrl);
}());
