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
					else if (status == 401){
						console.log(data);
						$location.path("/");
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
		
		$scope.addRemoveItemSelected= function(item){
			if($scope.selectedItems[item.id]){
				console.log("removed item");
				delete $scope.selectedItems[item.id];
			}
			else{
				console.log('added item');
				$scope.selectedItems[item.id] = item;
			}
				
		}
		
		$scope.deleteItems = function(list){
			var numItemSelected = Object.keys($scope.selectedItems).length;
			if(numItemSelected>0 &&
					confirm("Are you sure you want to delete " + numItemSelected + " item(s)?")){
				for(var key in $scope.selectedItems){
					ListrService.deleteItem(list.id, key, function(data, status){
						if(status==200){
							console.log("deleting: " + data);
							removeItemFromList(list, data);
							delete $scope.selectedItems[data];
						}
						else{
							console.log("error deleting item from list" );
						}
					});
				}	
			}
			
		};
		
		$scope.checkOff = function(list){
			for(var key in $scope.selectedItems){
				ListrService.checkoffItem(list.id, key, function(data, status){
					if(status==200){
						console.log("Checking off: " + data.id);
						$scope.selectedItems[data.id].done = !$scope.selectedItems[data.id].done
						$scope.addRemoveItemSelected(data);
					}
					else{
						console.log("error deleting item from list" );
					}
				});
			}
		}
		
		$scope.isCheckedOff= function(item){
			return item.done ? "item-checkedoff" : null
		};
		
		$scope.checkbox = {};
		
		$scope.selectedItems = {};
		
		$scope.mouseOverTitle = false;
		
		$scope.displayCheckedoff=false;
		
		getList($routeParams.groupId, $routeParams.listId);
		
	};
	module.controller("ListCtrl", ListCtrl);
}());
