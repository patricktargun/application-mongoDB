var app = angular.module('myApp');

app.controller('mainCtrl', function ($scope, $location) {

	$scope.loginShow = true;

	$scope.toForm = function(){
		$location.path('/appForm');
	}

	$scope.stausLogin = function(){
		$location.path('/statusLogin');
	}

	$scope.loginToggle = function(){
		$scope.loginShow = !$scope.loginShow
		$scope.passwordResetShow = !$scope.passwordResetShow
	}

});