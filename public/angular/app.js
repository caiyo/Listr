(function(){
	var app = angular.module("listr", ["ngRoute","ngCookies", "ui.bootstrap"])
							.config(['$httpProvider', function($httpProvider) {
  											$httpProvider.defaults.withCredentials = false;
							}]);

	app.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "/assets/angular/views/main.html",
				controller: "MainCtrl"
			})
			.when("/group",{
				templateUrl: "/assets/angular/views/groupView.html"
			});

	});
}());