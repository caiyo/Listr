(function(){
	var module = angular.module("listr");

	var GroupCtrl = function($scope, $rootScope, GroupProvider, $location, $routeParams){
		var selected = GroupProvider.getSelected();
		var groupId = $routeParams.groupId;
		
		
		//Checks to see if logged in user is an admin of the group
		//used to determine whether user can add users to group or not
		var isAdmin = function(){
			var user = $rootScope.user;
			var groupAdmins = GroupProvider.getSelected().admins;
			for(i in groupAdmins){
				if(groupAdmins[i].userName == user.userName)
					return true;
			}
			return false;
		}
		

		$scope.group = selected.id == groupId ? selected : GroupProvider.setSelected(GroupProvider.getGroup(groupId));
		console.log("selected: ");
		console.log($scope.group);
		$scope.isAdmin = isAdmin();
		
	};
	module.controller("GroupCtrl", GroupCtrl);
}());
