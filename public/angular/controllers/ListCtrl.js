(function(){
	var module = angular.module("listr");

	var ListCtrl = function($scope, ListrService, $routeParams, ListProvider){
		var listId = $routeParams.listId;
		var groupId = $routeParams.groupId;
		var currentList = ListProvider.getList();
		
		
		$scope.list = currentList.id == listId ? currentList : ListProvider.setList(ListProvider.findList(groupId,listId));
	};
	module.controller("ListCtrl", ListCtrl);
}());
