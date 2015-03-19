(function(){

	var SidebarProvider = function(){
		var provider = {};
		var obj = { collapsed: true};
		provider.isCollapsed = function(){
			return obj;
		}
		provider.setCollapsed = function(collapse){
			obj.collapsed=collapse;
		}
		
		return provider;
	};
	var module = angular.module("listr");
	module.factory("SidebarProvider", SidebarProvider);
}());