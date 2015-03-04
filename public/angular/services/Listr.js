(function(){

	var listr = function($rootScope, $http, $cookies){
		var service = {};
		/*
		 * GROUP HTTP SERVICE METHODS
		 */
		service.createGroup = function(groupName, callback){
			$http({
				method: "POST",
				url: "/api/groups",
				data: {
					name: groupName
				}
			}).success(function(data,status){
				callback(data,status);
			}).error(function(data,status){
				callback(data,status);
			});
		}
		service.getGroups = function(callback){
			$http({
				method: "GET",
				url: "/api/groups",
			})
			.success(function(data, status){
				callback(data,status);
			});
		};
		
		service.getGroup= function(groupId, callback){
			$http({
				method: "GET",
				url: "/api/groups/"+groupId,
			})
			.success(function(data, status){
				callback(data,status);
			}).error(function(data,status){
				callback(data,status);
			});
		};
		
		service.updateGroupName = function(groupId, newName, callback){
			$http({
				method: "PUT",
				url: "/api/groups/"+groupId,
				data:{
					name: newName
				}
			}).success(function(data,status){
				callback(data,status)
			}).error(function(data,status){
				callback(data,status);
			});
		}
		
		service.deleteGroup = function(groupId, callback){
			$http({
				method: "DELETE",
				url: "/api/groups/"+groupId
			}).success(function(data,status){
				callback(data,status)
			}).error(function(data,status){
				callback(data,status);
			});
		};
		
		service.addUserToGroup = function(groupId, userToAdd, isAdmin, callback){
			$http({
				method: "POST",
				url: "/api/groups/"+groupId+"?action=addUser",
				data: {
					username: userToAdd,
					isAdmin: isAdmin
				}
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		};
		
		service.promoteUserToAdmin = function(userToPromote, groupId, callback){
			$http({
				method: "POST",
				url: "/api/groups/"+groupId+"?action=promoteUser",
				data: {
					username: userToPromote
				}
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		};
		
		service.removeUserFromGroup = function(userToRemove, groupId, callback){
			$http({
				method: "POST",
				url: "/api/groups/"+groupId+"?action=removeUser",
				data: {
					username: userToRemove
				}
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		};
		
		service.demoteUserInGroup = function(userToDemote, groupId, callback){
			$http({
				method: "POST",
				url: "/api/groups/"+groupId+"?action=demoteUser",
				data: {
					username: userToDemote
				}
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		};
		
		/*
		 * END GROUP HTTP SERVICE METHODS
		 */
		
		
		/*
		 * List HTTP SERVICE METHODS
		 */
		service.getList= function(listId, callback){
			$http({
				method: "GET",
				url: "/api/lists/"+listId,
			})
			.success(function(data, status){
				callback(data,status);
			}).error(function(data,status){
				callback(data,status);
			});
		};
		
		service.createList = function (groupId, data, callback){
			$http({
				method: "POST",
				url: "/api/groups/"+groupId+"/lists",
				data: data
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		};
		
		service.updateListName = function(listId, newName, callback){
			$http({
				method: "PUT",
				url: "/api/lists/"+listId,
				data:{
					name: newName
				}
			}).success(function(data,status){
				callback(data,status)
			}).error(function(data,status){
				callback(data,status);
			});
		}
		
		service.deleteList = function (listId, callback){
			$http({
				method: "DELETE",
				url: "/api/lists/"+listId,
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		};
		
		service.addItem = function(listId, item, callback){
			$http({
				method: "POST",
				url: "/api/lists/"+listId,
				data: item
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		}
		
		service.deleteItem = function(listId, itemId, callback){
			$http({
				method: "DELETE",
				url: "/api/lists/"+listId+"/item/"+itemId
			}).success(function(data, status){
				callback(itemId, status);
			}).error(function(data,status){
				console.log(status);
				callback(itemId, status);
			});
		}
		service.checkoffItem = function(listId,itemId, callback){
			$http({
				method: "PUT",
				url: "/api/lists/"+listId+"/item/"+itemId+"/checkoff",
			}).success(function(data, status){
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		}
		
		/*
		 * END LIST HTTP SERVICE METHODS
		 */
		
		return service;
	};
	var module = angular.module("listr");
	module.factory("ListrService", listr);
}());