// "use strict";

var datePickService = require('../services/datePickService');

module.exports.getDate = function(req, res){
	//Create the Blank Available Slots Object
	var availableSlots = {
		dateOne: [],
		dateTwo: [],
		dateThree: []
	};

	// Create a function that creates the dates
	var createDates = function(addDays, hour, minute, dateArray){
		var someDate = new Date();
		someDate.setDate(someDate.getDate() + addDays);
		someDate.setHours(hour, minute, 00, 00);
		dateArray.push(someDate);
	}

	//Now we make the dates
	var day = new Date().getDay();
	if(day === 0 || day === 1 || day === 2) {

		createDates(1, 10, 30, availableSlots.dateOne);
		createDates(1, 11, 00, availableSlots.dateOne);
		createDates(1, 12, 00, availableSlots.dateOne);
		createDates(1, 13, 30, availableSlots.dateOne);
		createDates(1, 14, 00, availableSlots.dateOne);

		createDates(2, 10, 30, availableSlots.dateTwo);
		createDates(2, 11, 00, availableSlots.dateTwo);
		createDates(2, 12, 00, availableSlots.dateTwo);
		createDates(2, 13, 30, availableSlots.dateTwo);
		createDates(2, 14, 00, availableSlots.dateTwo);

		createDates(3, 10, 30, availableSlots.dateThree);
		createDates(3, 11, 00, availableSlots.dateThree);
		createDates(3, 12, 00, availableSlots.dateThree);
		createDates(3, 13, 30, availableSlots.dateThree);
		createDates(3, 14, 00, availableSlots.dateThree);
	};
	if(day === 3) {

		createDates(1, 10, 30, availableSlots.dateOne);
		createDates(1, 11, 00, availableSlots.dateOne);
		createDates(1, 12, 00, availableSlots.dateOne);
		createDates(1, 13, 30, availableSlots.dateOne);
		createDates(1, 14, 00, availableSlots.dateOne);

		createDates(2, 10, 30, availableSlots.dateTwo);
		createDates(2, 11, 00, availableSlots.dateTwo);
		createDates(2, 12, 00, availableSlots.dateTwo);
		createDates(2, 13, 30, availableSlots.dateTwo);
		createDates(2, 14, 00, availableSlots.dateTwo);

		createDates(5, 10, 30, availableSlots.dateThree);
		createDates(5, 11, 00, availableSlots.dateThree);
		createDates(5, 12, 00, availableSlots.dateThree);
		createDates(5, 13, 30, availableSlots.dateThree);
		createDates(5, 14, 00, availableSlots.dateThree);
	};
	if(day === 4) {

		createDates(1, 10, 30, availableSlots.dateOne);
		createDates(1, 11, 00, availableSlots.dateOne);
		createDates(1, 12, 00, availableSlots.dateOne);
		createDates(1, 13, 30, availableSlots.dateOne);
		createDates(1, 14, 00, availableSlots.dateOne);

		createDates(4, 10, 30, availableSlots.dateTwo);
		createDates(4, 11, 00, availableSlots.dateTwo);
		createDates(4, 12, 00, availableSlots.dateTwo);
		createDates(4, 13, 30, availableSlots.dateTwo);
		createDates(4, 14, 00, availableSlots.dateTwo);

		createDates(5, 10, 30, availableSlots.dateThree);
		createDates(5, 11, 00, availableSlots.dateThree);
		createDates(5, 12, 00, availableSlots.dateThree);
		createDates(5, 13, 30, availableSlots.dateThree);
		createDates(5, 14, 00, availableSlots.dateThree);

	};
	if(day === 5) {

		createDates(3, 10, 30, availableSlots.dateOne);
		createDates(3, 11, 00, availableSlots.dateOne);
		createDates(3, 12, 00, availableSlots.dateOne);
		createDates(3, 13, 30, availableSlots.dateOne);
		createDates(3, 14, 00, availableSlots.dateOne);

		createDates(4, 10, 30, availableSlots.dateTwo);
		createDates(4, 11, 00, availableSlots.dateTwo);
		createDates(4, 12, 00, availableSlots.dateTwo);
		createDates(4, 13, 30, availableSlots.dateTwo);
		createDates(4, 14, 00, availableSlots.dateTwo);

		createDates(5, 10, 30, availableSlots.dateThree);
		createDates(5, 11, 00, availableSlots.dateThree);
		createDates(5, 12, 00, availableSlots.dateThree);
		createDates(5, 13, 30, availableSlots.dateThree);
		createDates(5, 14, 00, availableSlots.dateThree);
	};
	if(day === 6) {

		createDates(2, 10, 30, availableSlots.dateOne);
		createDates(2, 11, 00, availableSlots.dateOne);
		createDates(2, 12, 00, availableSlots.dateOne);
		createDates(2, 13, 30, availableSlots.dateOne);
		createDates(2, 14, 00, availableSlots.dateOne);

		createDates(3, 10, 30, availableSlots.dateTwo);
		createDates(3, 11, 00, availableSlots.dateTwo);
		createDates(3, 12, 00, availableSlots.dateTwo);
		createDates(3, 13, 30, availableSlots.dateTwo);
		createDates(3, 14, 00, availableSlots.dateTwo);

		createDates(4, 10, 30, availableSlots.dateThree);
		createDates(4, 11, 00, availableSlots.dateThree);
		createDates(4, 12, 00, availableSlots.dateThree);
		createDates(4, 13, 30, availableSlots.dateThree);
		createDates(4, 14, 00, availableSlots.dateThree);
	};


	//Now we find which dates are taken
	var takenDates = [];
	datePickService.findDate()
	.then(function(dates){

		var dateOne = availableSlots.dateOne;
		var dateTwo = availableSlots.dateTwo;
		var dateThree = availableSlots.dateThree;

		//Make arrat if taken dates
		for(var i = 0; i < dates.length; i++){
			takenDates.push(dates[i].applyDate);
		};

		//Splice taken from day one
		for(var j = 0; j < dateOne.length; j++){
			for(var t = 0; t < takenDates.length; t++){
				if(dateOne[j].toJSON() === takenDates[t]){
					dateOne.splice(j, 1);
				}
			}
		};
		//Splice taken from day two
		for(var j = 0; j < dateTwo.length; j++){
			for(var t = 0; t < takenDates.length; t++){
				if(dateTwo[j].toJSON() === takenDates[t]){
					dateTwo.splice(j, 1);
				}
			}
		};
		//Splice taken from day three
		for(var j = 0; j < dateThree.length; j++){
			for(var t = 0; t < takenDates.length; t++){
				if(dateThree[j].toJSON() === takenDates[t]){
					dateThree.splice(j, 1);
				}
			}
		};
		res.status(200).json(availableSlots);
	});

};



module.exports.setDate = function(req, res){
	datePickService.saveDate(req.body)
		.then(function(date){
			res.json(date);
		}).catch(function(err){
			res.status(500).json(err);
		})
};
