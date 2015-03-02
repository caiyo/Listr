(function(){

	var ListProvider = function($location, GroupProvider){
		var provider = {};
		var currentList={};
		
		provider.getList = function(){
			return currentList;
		}
		
		provider.setList=function(list){
			currentList=list;
		}
		
		

		return provider;
	};
	var module = angular.module("listr");
	module.factory("ListProvider", ListProvider);
}());