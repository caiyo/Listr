(function(){
	var module = angular.module("listr");

	var GroupCtrl = function($scope, ListrService, $location){
		ListrService.getGroups(function(data, status){
			if(status == 200){
				console.log(data);
				$scope.groups=data;
			}
		});
		
		$scope.groupSelected=function(group){
			return group ===$scope.selected? 'selected' : null;
		}
		
		$scope.display=function(group){
			group.display = !group.display;

		}
		
		$scope.select=function(group){
			$scope.selected=group;
			group.display = true;
		}
		
		$scope.addUserToGroup=function(group){
			console.log("adding member");
		}
	};
	module.controller("GroupCtrl", GroupCtrl);
}());
