(function(){
	var app = angular.module("listr", ["ngRoute","ngCookies", "ui.bootstrap"])
							

	app.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "/assets/angular/views/main.html",
			})
			.when("/group/:groupId",{
				templateUrl: "/assets/angular/views/groupView.html",
				controller: "GroupCtrl"
			})
			.when("/group/:groupId/list/:listId",{
				templateUrl: "/assets/angular/views/listView.html",
				controller: "ListCtrl"
			}).otherwise("/");

	});
}());