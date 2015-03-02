(function(){
	var module = angular.module("listr");

	var SidebarCtrl = function($scope, ListrService, $location, GroupProvider, ListProvider){
		$scope.groups=GroupProvider.getGroups();
		
		$scope.groupSelected=function(group){
			return group.id ===$scope.selected.group.id ? 'selected-group' : null;
		}
		
		$scope.displayLists=function(group){
			group.display = !group.display;
		}
		
		$scope.select=function(group){
			GroupProvider.setSelected(group);
			$scope.selected=GroupProvider.getSelected();
			$location.path("/group/"+ $scope.selected.group.id);
		}
		
		$scope.clickList = function(list, group){
			ListProvider.setList(list);
			$location.path("/group/"+group.id+"/list/"+list.id);
		}

		$scope.selected=GroupProvider.getSelected();
	};
	module.controller("SidebarCtrl", SidebarCtrl);
}());
