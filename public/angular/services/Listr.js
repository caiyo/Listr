(function(){

	var listr = function($rootScope, $http, $cookies){
		var service = {};
		
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
				callback(data, status);
			}).error(function(data,status){
				console.log(status);
				callback(data, status);
			});
		}
		
		return service;
	};
	var module = angular.module("listr");
	module.factory("ListrService", listr);
}());