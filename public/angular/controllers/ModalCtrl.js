(function(){
	var modalCtrl = function($scope, $modal){
		$scope.addToAdmin = 'false';
		var modal = {
			addUser: {
				templateUrl: "/assets/angular/views/addMemberModal.html",
				controller: "AddGroupModalInstanceCtrl"
			},
			createList:{
				templateUrl: "/assets/angular/views/createListModal.html",
				controller: "CreateListModalInstanceCtrl"
			},
			addItem:{
				templateUrl: "/assets/angular/views/addItemModal.html",
				controller: "AddItemModalInstanceCtrl"
			},
			createGroup:{
				templateUrl: "/assets/angular/views/createGroupModal.html",
				controller: "createGroupModalInstanceCtrl"
			}
		};
		$scope.open = function(action, obj){
			console.log(obj);
			$modal.open({
				templateUrl : modal[action].templateUrl,
				controller: modal[action].controller,
				resolve: {
					obj : function() { return obj},
				}
			});
		}
		

	};
	
	var addGroupModalInstanceCtrl = function($scope,$modalInstance, ListrService, obj){
		//obj is a group object
		$scope.ok = function(){
			ListrService.addUserToGroup(obj.id, $scope.username, $scope.addToAdmin, function(data, status){
				if(status == 200){
					obj.members.push(data);
					if($scope.addToAdmin)
						obj.admins.push(data);
					$modalInstance.close();
				}
				else{
					console.log("error");
					$scope.error = data;
				}
			});
			
		}
		
		$scope.cancel = function(){
			console.log("Cancelling")
			$modalInstance.dismiss("cancel");
		}
	};
	
	var createListModalInstanceCtrl = function($scope, $modalInstance, ListrService, obj){
		//obj is a group object
		var formatData = function(form){
			console.log(form);
			var data={};
			data.name=form.name;
			for(var i=0; i<form.properties.length; i++){
				var propName = "prop"+i;
				var reqName = "req_"+propName;
				console.log("prop name: " + propName);
				data[propName] = form.properties[i].propName;
				console.log("data: " +data[propName]);
				if(form.properties[i].req){
					data[reqName] = form.properties[i].req;
				}
			}
			return data;
		};
		
		$scope.ok = function(){
			var data = formatData($scope.listForm);
			console.log(data);
			ListrService.createList(obj.id, data, function(data, status){
				if(status==200){
					obj.lists.push(data);
					$modalInstance.close();
				}
				else{
					$scope.error = data;
				}
			});
			
		};
		
		$scope.cancel = function(){
			console.log("Cancelling")
			$modalInstance.dismiss("cancel");
		};
		
		$scope.listForm = {
				name: "",
				properties:[]	
			};
			
		$scope.addListProperty = function(){
			var properties = $scope.listForm.properties;
			properties.push({
				propName : "",
			});
			console.log(properties)
		}
	};
	
	var addItemModalInstanceCtrl = function($scope,$modalInstance, ListrService, obj){
		//obj is a list object
		$scope.list=obj;
		$scope.item = {
			name : ""			
		};
		$scope.ok = function(){
			console.log($scope.item);
			ListrService.addItem($scope.list.id, $scope.item, function(data, status){
				if(status==200){
					obj.items.push(data);
					$modalInstance.close();		
				}
				else{
					$scope.error = data;
				}
			});
		}
		
		$scope.cancel = function(){
			console.log("Cancelling")
			$modalInstance.dismiss("cancel");
		}
	};
	
	var createGroupModalInstanceCtrl = function($scope,$modalInstance, GroupProvider, ListrService, obj){
		$scope.groupName;
		
		$scope.ok = function(){
			console.log($scope.groupName);
			ListrService.createGroup($scope.groupName, function(data,status){
				if(status==200){
					GroupProvider.setGroups([data]);
				}
				else{
					console.log("error creating group");
				}
			});
			$modalInstance.close();		

		}
		
		$scope.cancel = function(){
			console.log("Cancelling")
			$modalInstance.dismiss("cancel");
		}
	};
	
	var module = angular.module("listr");
	module.controller("ModalCtrl", modalCtrl);
	module.controller("AddGroupModalInstanceCtrl", addGroupModalInstanceCtrl);
	module.controller("CreateListModalInstanceCtrl", createListModalInstanceCtrl);
	module.controller("AddItemModalInstanceCtrl", addItemModalInstanceCtrl);
	module.controller("createGroupModalInstanceCtrl", createGroupModalInstanceCtrl);

}());