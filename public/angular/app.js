(function(){
	var app = angular.module("listr", ["ngRoute","ngCookies"])
							.config(['$httpProvider', function($httpProvider) {
  											$httpProvider.defaults.withCredentials = false;
							}]);

	/*app.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "main.html",
				controller: "MainCtrl"
			});

	});*/
}());