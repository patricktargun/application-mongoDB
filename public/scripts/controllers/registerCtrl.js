var app = angular.module('myApp');

app.controller('registerCtrl', function ($scope, applicantService, $location) {
	//
	//Industry Selector
	//
	$scope.parents = [];
	$scope.children = [];
	$scope.bucket = [];
	$scope.selectBoxes = true;

	var addParents = function(data){
		for(var i = 0; i < data.length; i++){
			$scope.parents.push(data[i]);
		}
	}
	addParents(industries);

	$scope.showChildren = function(parentData){
		$scope.children = parentData.children;
	}

	$scope.addToBucket = function(childData){
		arr = $scope.children;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].name === childData.name){
				$scope.children.splice(i, 1);
			}
		}
		$scope.bucket.push(childData);
		if($scope.bucket.length > 2){
			$scope.selectBoxes = false;
		}
	}

	$scope.removeFromBucket = function(bucketData){
		arr = $scope.bucket;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].name === bucketData.name){
				$scope.children.unshift(arr[i]);
				$scope.bucket.splice(i, 1);
			}
		}
		if($scope.bucket.length < 3){
			$scope.selectBoxes = true;
		}
	}

	$scope.login = function(user) {
		applicantService.login(user.email, user.password)
			.success(function(){
				console.log('You have logged in!');
				//redirect them to status page
				$scope.loginError = false;
				$location.path('/appStatus');
			})
			.error(function(){
				console.log('Failed Login');
				$scope.loginError = true;
			})
	}

	$scope.register = function(userData){
		//Create the Industry Bucket array
		userData.industryBucket = [];
		for(var i = 0; i < $scope.bucket.length; i++){
			userData.industryBucket.push($scope.bucket[i].name);
		}

		$scope.$broadcast('show-errors-check-validity');

		if (!$scope.applicationForm.$valid) {
			return; 
		}
		else if ($scope.applicationForm.$valid) {
			return applicantService.register(userData)
				.then(function(){
					applicantService.login(userData.email, userData.password)
					.then(function(){
						$location.path('/appReview');
					})
				})
		}
	}

});