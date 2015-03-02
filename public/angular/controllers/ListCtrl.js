(function(){
	var module = angular.module("listr");

	var ListCtrl = function($scope, ListrService, $routeParams, ListProvider){
		var currentList = ListProvider.getList();
		
		//Gets data about List. If currentList isnt null, then the list
		//has already been loaded and no extra http call has to be made
		var getList = function(groupId, listId){
			if(currentList.id==listId){
				$scope.list=currentList;
				console.log($scope.list);
			}
			else{
				ListrService.getList(listId, function(data,status){
					if(status ==200){
						$scope.list=data;
					}
					else{
						console.log(data);
					}
				})
			}
		};
		
		var removeItemFromList = function(list, itemId){
			for(var i= list.items.length-1; i>=0; i--){
				if(list.items[i].id==itemId)
					return list.items.splice(i,1);
			}
		};
		
		$scope.deleteItems = function(list){
			for(var key in $scope.itemChecked){
				ListrService.deleteItem(list.id, key, function(data, status){
					if(status==200){
						console.log("deleting: " + key);
						removeItemFromList(list, key);
						delete $scope.itemChecked[key];
					}
					else{
						console.log("error deleting item from list" );
					}
				});
			}
		};
		
		
		
		$scope.isCompleted= function(item){
			return item.done ? "item-checkedoff" : null
		};
		
		$scope.itemChecked = {};
		
		getList($routeParams.groupId, $routeParams.listId);
		
	};
	module.controller("ListCtrl", ListCtrl);
}());
