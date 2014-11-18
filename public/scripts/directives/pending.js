var app = angular.module('myApp');

app.directive('pending', function($q){
	return {
		restrict: 'A',
		//Says where you can use the directive in the html

		scope: {
			request: '&'
			//request is the attribute name that you want to bind to inside the directive scope
		},


		link: function(scope, elem, attrs){
			// console.log(scope, elem, attrs);
			var spinner = angular.element('<button class="submit-btn"><i class="ion-loading-c"></i> Submitting</button>').hide();
			elem.after(spinner);

			var dynamicFunc = function(){
				var deferred = $q.defer();
				deferred.resolve(scope.request());

				return deferred.promise;
			};

			elem.click(function(){
				spinner.show();
				elem.hide(); 
				dynamicFunc()
					.then(function(data){
						setTimeout(function(){
							spinner.hide();
							elem.show();
						}, 1000);
					})
			});

		},
	}

});