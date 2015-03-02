(function(){
	var module = angular.module("listr");

	var GroupCtrl = function($scope, $rootScope, ListrService, GroupProvider, $location, $routeParams){
		var selected = GroupProvider.getSelected().group;
		
		//Checks to see if logged in user is an admin of the group
		//used to determine whether user can add users to group or not
		var isAdmin = function(){
			var user = $rootScope.user;
			var groupAdmins = $scope.group.admins;
			for(i in groupAdmins){
				if(groupAdmins[i].userName == user.userName)
					return true;
			}
			return false;
		};
		
		//Gets data about group. If selected isnt null, then the group
		//has already been loaded and no extra http call has to be made
		var getGroup = function(groupId){
			if(selected.id==groupId){
				$scope.group=selected;
				console.log($scope.group);
				$scope.isAdmin = isAdmin();
			}
			else{
				ListrService.getGroup(groupId, function(data,status){
					if(status==200){
						GroupProvider.setSelected(data);
						$scope.group=GroupProvider.getSelected().group;
						$scope.isAdmin = isAdmin();
					}
					else{
						console.log(data);
					}
				})
			}
		};
		
		getGroup($routeParams.groupId);
		
		
	};
	module.controller("GroupCtrl", GroupCtrl);
}());
