(function(){
	var module = angular.module("listr");

	var MainCtrl = function($scope, ListrService, $location, GroupProvider, ListProvider){
		ListrService.getGroups(function(data, status){
			if(status == 200){
				console.log(data);
				GroupProvider.setGroups(data);
				$scope.groups=data;
			}
		});
		
		$scope.groupSelected=function(group){
			return group ===$scope.selected? 'selected-group' : null;
		}
		
		$scope.displayLists=function(group){
			group.display = !group.display;

		}
		
		$scope.select=function(group){
			GroupProvider.setSelected(group);
			$scope.selected=GroupProvider.getSelected();
			group.display = true;
			$location.path("/group/"+ $scope.selected.id);
		}
		
		$scope.clickList = function(list, group){
			ListProvider.setList(list);
			$location.path("/group/"+group.id+"/list/"+list.id);
		}

		$scope.selected=GroupProvider.getSelected();
	};
	module.controller("MainCtrl", MainCtrl);
}());
