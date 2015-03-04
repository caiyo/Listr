(function(){
	var module = angular.module("listr");

	var SidebarCtrl = function($scope, ListrService, $location, GroupProvider, ListProvider){
		
		$scope.isCollapsed = false;
		
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
		
		$scope.removeGroup = function(group){
			ListrService.deleteGroup(group.id, function(data,status){
				if (status==200){
					GroupProvider.removeGroup(data.id);
					if($scope.groups.length > 0)
						$scope.select($scope.groups[0]);
					else
						$location.path("/");
				}
				else{
					console.log("Could not delete group: " + data.id);
				}
			});
			
			
		}
		

		$scope.selected=GroupProvider.getSelected();
	};
	module.controller("SidebarCtrl", SidebarCtrl);
}());
