(function(){
	var module = angular.module("listr");

	var ListCtrl = function($scope, ListrService, $routeParams, ListProvider){
		$scope.list = ListProvider.getList();
		
	};
	module.controller("ListCtrl", ListCtrl);
}());
