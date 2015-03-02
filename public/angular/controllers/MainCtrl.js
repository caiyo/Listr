(function(){
	var module = angular.module("listr");

	var MainCtrl= function($scope, $rootScope, $cookieStore, ListrService, GroupProvider, AuthenticationService){
		
		
		if($cookieStore.get("PLAY_SESSION")){
			ListrService.getGroups(function(data, status){
				if(status == 200){
					console.log(data);
					GroupProvider.setGroups(data);
				}
			});
			
			AuthenticationService.getCredentials(function(data, status){
				if (status == 200){
					$rootScope.user=data;
				}
				else{
					console.log("couldnt get user data");
				}
			});
		}
		

	};
	module.controller("MainCtrl", MainCtrl);
}());
