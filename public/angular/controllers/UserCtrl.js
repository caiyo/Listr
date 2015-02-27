(function(){
	var module = angular.module("listr");

	var UserCtrl = function($scope, $rootScope){
		$rootScope.user={
				name:'Kyle',
				userName: 'caiyo'
		};
	};	
	module.controller("UserCtrl", UserCtrl);
}());
