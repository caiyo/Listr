(function(){
	var module = angular.module("listr");

	var HeaderCtrl = function($scope){
		$scope.isCollapsed = true;
	};
	module.controller("HeaderCtrl", HeaderCtrl);
}());
