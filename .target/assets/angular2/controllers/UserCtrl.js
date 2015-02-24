(function(){
	var module = angular.module("listr");

	var UserCtrl = function($scope){
		//var user = {name: "Kyle"};
		//$scope.user = user;
		$scope.test="test";

		return{
			test : $scope.test
		};

	};
	module.controller("UserCtrl", UserCtrl);
}());
