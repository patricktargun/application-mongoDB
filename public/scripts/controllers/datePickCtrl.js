(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('datePickCtrl' , datePickCtrl);

	function datePickCtrl(dateService, applicantService){
		var vm = this;

		//show/hide
		vm.showSelected = false;
		vm.finalTime = false;
		vm.availableDates = true;
		//arrays
		vm.showTimesOne = [];
		vm.showTimesTwo = [];
		vm.showTimesThree = [];
		//functions
		vm.pickedDate = pickedDate;
		vm.finalizedAppoint = finalizedAppoint;
		//values
		vm.selectedDate = '';

		///////

		var getDays = function(){
			dateService.getDays().then(function(results){
				vm.showTimesOne = results.dateOne;
				vm.showTimesTwo = results.dateTwo;
				vm.showTimesThree = results.dateThree;
			});
		};
		getDays();

		function pickedDate(time) {
			vm.selectedDate = time;
			vm.showSelected = true;
		};

		function finalizedAppoint(selectedDate){
			applicantService.getApplicantData()
				.then(function(user){
				console.log(user);	
				applicantService.editApplicantDate(selectedDate ,user._id)
					.then(function(user){
						console.log(user);
					})
				})
				
			dateService.setDate(selectedDate);
			vm.showSelected = false;
			vm.finalTime = true;
			vm.availableDates = false;
		};

	};

})();















