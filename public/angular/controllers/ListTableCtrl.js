(function(){
	var module = angular.module("listr");

	var ListTableCtrl = function($scope, ListrService, $location, ListProvider){
		$scope.selectRow = function(list){
			$scope.selectedList=list;
		};
		
		$scope.listSelected = function(list){
			return list ===$scope.selectedList? 'selected-list' : null;
		};
		
		$scope.deleteList = function(list, group){
			ListrService.deleteList(list.id, function(data,status){
				if(status == 200){
					for(i in group.lists){
						if(group.lists[i].id == list.id){
							group.lists.splice(i,1);	
							return;
						}
					}
				}
				else{
					console.log(data);
				}
			});
		};
		$scope.routeToList = function (list, group){
			ListProvider.setList(list);
			$location.path("/group/"+group.id+"/list/"+list.id);			
		}

	};	
	module.controller("ListTableCtrl", ListTableCtrl);
}());
