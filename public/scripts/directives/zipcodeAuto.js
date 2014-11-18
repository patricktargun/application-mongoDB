var app = angular.module('myApp');


app.directive('zipcodeAuto', function($http, $q){
	return {
		restrict: 'A',
		scope: {
			zip: '=',
			city: '=',
			state: '='
		},
		link: function(scope, element, attrs){
			element.bind('keyup', function(){
				if(scope.zip && scope.zip.length === 5){
					return $http({
						url: "http://api.zippopotam.us/us/" + scope.zip,
	                	cache: false,
	                	dataType: "json",
	                	type: "GET"
					}).then(function(result){		
						scope.city = result.data.places[0]['place name'];
						scope.state = result.data.places[0]['state abbreviation'];	
					});
				}
				if (scope.zip && (scope.zip.length < 5 || scope.zip.length > 5)) {
					scope.city = '';
					scope.state = '';
				}
			});
		}
	}
});