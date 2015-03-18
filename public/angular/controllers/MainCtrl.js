(function(){
	var module = angular.module("listr");

	var MainCtrl= function($scope,InitialDataLoad, SidebarProvider){
		$scope.switchCollapsed = function(collapse){
			SidebarProvider.setCollapsed(!SidebarProvider.isCollapsed().collapsed);
		};
		
		InitialDataLoad.loadData();

	};
	module.controller("MainCtrl", MainCtrl);
}());
