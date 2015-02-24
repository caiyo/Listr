(function(){
	var modalCtrl = function($scope, $modal){
		$scope.open = $modal.open({
			templateUrl : "/assets/angular/views/modal.html",
			controller: "ModalInstanceCtrl"
		});
	};
	
	var modalInstanceCtrl = function($scope,$modalInstance, ListrService){
		
		$scope.ok = function(){
			console.log("closing");
			$modalInstance.close();
		}
		
		$scope.cancel = function(){
			$modalInstance.dismiss("cancel");
		}
	};
	
	var module = angular.module("listr");
	module.controller("ModalCtrl", modalCtrl);
	module.controller("ModalInstanceCtrl", modalInstanceCtrl)

}());