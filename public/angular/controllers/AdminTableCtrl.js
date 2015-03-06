(function(){
	var module = angular.module("listr");

	var AdminCtrl = function($scope, ListrService){
		$scope.selectRow = function(admin){
			$scope.selectedAdmin=admin;
		};
		
		$scope.adminSelected = function(admin){
			return (admin ===$scope.selectedAdmin) && $scope.isAdmin? 'selected-tr' : null;
		};
		
		$scope.removeAdmin = function(admin, group){
			if($scope.selectedAdmin){
				ListrService.demoteUserInGroup(admin.userName, group.id, function(data,status){
					if(status==200){
						//if they were an admin, remove from there too
						for(var i= group.admins.length-1; i>=0; i--){
							if(group.admins[i].userName==admin.userName)
								group.admins.splice(i,1);
						}
					}
					else{
						alert(data);
						console.log("couldnt demote user from admin");
					}
				});
			}
			else{
				alert("Please select an admin to demote");
			}
			
		};
	};	
	module.controller("AdminTableCtrl", AdminCtrl);
}());
