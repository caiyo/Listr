(function(){
	var module = angular.module("listr");

	var GroupCtrl = function($scope, ListrService){
		ListrService.getGroups(function(data, status){
			if(status == 200){
				console.log(data);
				$scope.groups=data;
			}
		});
	};
	module.controller("GroupCtrl", GroupCtrl);
}());
