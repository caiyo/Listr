(function(){
	var module = angular.module("listr");
	var LogoutCtrl = function($scope, $rootScope, AuthenticationService, GroupProvider, $location){

		$scope.logout=function(){
			console.log("Logging out");
			AuthenticationService.logout(function(data,status) {
				if(status == 200){
					$rootScope.user = null;
					GroupProvider.clearGroups();
					$location.path("/");
				}
				else{
					alert("error logging out");
				}
			});
		};

	};
	module.controller("LogoutCtrl", LogoutCtrl);
}());
