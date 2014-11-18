(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('dateService' , dateService);

	function dateService($http, $q){

		var service = {
        	getDays: getDays,
        	setDate: setDate
    	};

    	return service;

    	////////////

	    function getDays() {
	    	var deferred = $q.defer();
	    	$http({
	       		method: 'GET',
	       		url: '/api/getDate'
	    	})
	       .then(function(response){
	       		deferred.resolve(response.data);
	       })
	       return deferred.promise;
	    };

	    function setDate(date) {
	    	$http({
	       		method: 'POST',
	       		url: '/api/setDate',
	       		data: {"applyDate": date}
	    	})
	    };

	};

})();