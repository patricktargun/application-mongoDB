var app = angular.module('myApp');

app.controller('appStatusCtrl', function ($scope, applicantService, $location, user) {
	$scope.user = user;
	$scope.appInfo = true;
	$scope.editAppInfo = false;
	$scope.datePicker = true;
	$scope.pickedDate = false;


	if(user.appAppointment !== undefined){
		$scope.datePicker = false;
		$scope.pickedDate = true;
	};

	$scope.editInfoBtn = function(){
		$scope.editAppInfo = true;
		$scope.appInfo = false;
	}

	$scope.submitEditsBtn = function(editUser){
		applicantService.editApplicant(editUser ,user._id)
		.then(function(){
			console.log('Edited User OK');
		})
		$scope.appInfo = true;
		$scope.editAppInfo = false;
	}

	$scope.logout = function(){
		applicantService.logout().then(function(){
			$location.path('/statusLogin')
		})
	}
});