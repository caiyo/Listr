(function(){

	var GroupProvider = function($location){
		var provider = {};
		var selected ={};
		var groups = [];
		
		provider.setSelected= function(group){
			console.log("set selected group to: "+ group.id);
			selected = group;
			return selected;
		}
		
		provider.getSelected= function(){
			return selected;
		}
		
		provider.getGroups= function(){
			return groups;
		}
		
		provider.setGroups = function(userGroups){
			groups=userGroups;
		}
		
		provider.getGroup = function(groupId){
			console.log("Looking for groupid: "+ groupId);
			for(var i=0; i<groups.length; i++){
				console.log("group id: "+ groups[i].id);
				if(groups[i].id == groupId){
					console.log("found group");
					return groups[i];
				}
			}
			console.log("Group not found");
			return null;
		};
		
		provider.getGroupList= function(groupId, listId){
			var groupLists = provider.getGroup(groupId).lists;
			for( var i=0; i<groupLists.length; i++){
				if(groupLists[i].id==listId)
					return groupLists[i];
			}
			return null;
		};
		
		
		return provider;
	};
	var module = angular.module("listr");
	module.factory("GroupProvider", GroupProvider);
}());