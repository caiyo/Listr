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
			}
		};
		$scope.open = function(action, group){
			console.log(group);
			$modal.open({
				templateUrl : modal[action].templateUrl,
				controller: modal[action].controller,
				resolve: {
					group : function() { return group},
				}
			});
		}
		

	};
	
	var addGroupModalInstanceCtrl = function($scope,$modalInstance, ListrService, group){
		
		$scope.ok = function(){
			ListrService.addUserToGroup(group.id, $scope.username, $scope.addToAdmin, function(data, status){
				if(status == 200){
					group.members.push(data);
					if($scope.addToAdmin)
						group.admins.push(data);
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
	
	var createListModalInstanceCtrl = function($scope, $modalInstance, ListrService, group){
		
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
			ListrService.createList(group.id, data, function(data, status){
				if(status==200){
					group.lists.push(data);
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
	
	var module = angular.module("listr");
	module.controller("ModalCtrl", modalCtrl);
	module.controller("AddGroupModalInstanceCtrl", addGroupModalInstanceCtrl);
	module.controller("CreateListModalInstanceCtrl", createListModalInstanceCtrl);

}());