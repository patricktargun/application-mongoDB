var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/appForm.html',
		controller: 'registerCtrl'
	})
	.when('/appForm', {
		templateUrl: '/partials/appForm.html',
		controller: 'registerCtrl'
	})
	.when('/statusLogin', {
		templateUrl: '/partials/statusLogin.html',
		controller: 'registerCtrl'
	})
	.when('/appStatus', {
		templateUrl: 'partials/appStatus.html',
		controller: 'appStatusCtrl',
		resolve: {
			user: function(applicantService){
				return applicantService.getApplicantData();
			}
		}
	})
	.when('/appReview', {
		templateUrl: 'partials/appReview.html',
		controller: 'appStatusCtrl',
		resolve: {
			user: function(applicantService){
				return applicantService.getApplicantData();
			}
		}
	})
	.when('/404', {
		templateUrl: '/partials/page404.html',
	})
	.otherwise({
		redirectTo: '/'
	})
});

app.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $location){
		return {
			'responseError': function(rejection) {
				if (rejection.status === 401) {
					$location.path('/statusLogin')
				}
				return $q.reject(rejection);
			}
		}
	})
});