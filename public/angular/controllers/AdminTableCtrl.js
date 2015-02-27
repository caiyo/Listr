(function(){
	var module = angular.module("listr");

	var AdminCtrl = function($scope, ListrService){
		$scope.selectRow = function(admin){
			$scope.selectedAdmin=admin;
		};
		
		$scope.adminSelected = function(admin){
			return admin ===$scope.selectedAdmin? 'selected-admin' : null;
		};
		
		$scope.removeAdmin = function(admin, group){
			ListrService.demoteUserInGroup(admin.userName, group.id, function(data,status){
				if(status==200){
					//if they were an admin, remove from there too
					for(var i= group.admins.length-1; i>=0; i--){
						if(group.admins[i].userName==admin.userName)
							group.admins.splice(i,1);
					}
				}
				else{
					console.log("couldnt demote user from admin");
				}
			})
		};
	};	
	module.controller("AdminTableCtrl", AdminCtrl);
}());
