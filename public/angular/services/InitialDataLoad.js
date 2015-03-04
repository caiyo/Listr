(function(){
	var module = angular.module("listr");

	var InitialDataLoad= function($rootScope, $cookieStore, ListrService, GroupProvider, AuthenticationService){
		
		var loadData = function(){
			if($cookieStore.get("PLAY_SESSION")){
				AuthenticationService.getCredentials(function(data, status){
					if (status == 200){
						AuthenticationService.setCredentials(data);
					}
					else{
						console.log("couldnt get user data, logging out");
						AuthenticationService.logout(function(){});
						
					}
				});
			}	
		}
		return {loadData:loadData};	

	};
	module.factory("InitialDataLoad", InitialDataLoad);
}());
