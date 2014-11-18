var app = angular.module('myApp');

app.factory('applicantService', function ($location, $http, $q){
	return {
		register: function(user){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: '/api/applicants',
				data: user
			})
			.success(function(response){
				console.log('success', response);
				deferred.resolve(response)
			})
			.error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		login: function(email, password) {
			return $http({
				method: 'POST', 
				url: '/api/auth', 
				data: {email: email, password: password}
			})
		},
		getApplicantData: function(){
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: '/api/user'
			})
			.success(function(response){
				console.log('success', response);
				deferred.resolve(response)
			})
			.error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		logout: function() {
			return $http({
				method: 'POST',
				url: '/api/unauth'
			})
		},
		editApplicant: function(user, id){
			var deferred = $q.defer();

			$http({
				method: 'PUT',
				url: '/api/user/' + id,
				data: user
			})
			.then(function(response){
				deferred.resolve(response);
			})
			return deferred.promise;
		},
		editApplicantDate: function(date, id){
			var deferred = $q.defer();

			$http({
				method: 'PUT',
				url: '/api/user/' + id,
				data: {
					appAppointment: date
				}
			})
			.then(function(response){
				deferred.resolve(response);
			})
			return deferred.promise;
		}
	}

});



