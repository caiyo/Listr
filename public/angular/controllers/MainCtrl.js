(function(){
	var module = angular.module("listr");

	var MainCtrl= function(InitialDataLoad){
		
		InitialDataLoad.loadData();

	};
	module.controller("MainCtrl", MainCtrl);
}());
