(function(){

	var GroupProvider = function($location){
		var provider = {};
		var selected ={
				group : {}
		};
		var groups = [];
		
		provider.setSelected= function(group){
			if(group){
				group.display=true;
				selected.group = group;
			}
			else
				selected.group = {};
			
			return selected;
		}
		
		provider.getSelected= function(){
			return selected;
		}
		
		provider.getGroups= function(){
			return groups;
		}
		
		provider.setGroups = function(userGroups){
			for(var i =0; i<userGroups.length; i++){
				groups.push(userGroups[i]);
			}
		}
		provider.removeGroup = function(groupId){
			for(var i=0; i<groups.length; i++){
				if(groups[i].id == groupId){
					return groups.splice(i,1);
				}
			}
		}		
		return provider;
	};
	var module = angular.module("listr");
	module.factory("GroupProvider", GroupProvider);
}());