"use strict";

var ApplyDates = require('../models/applyDates');
var Promise = require('bluebird');

Promise.promisifyAll(ApplyDates);
Promise.promisifyAll(ApplyDates.prototype);

module.exports.saveDate = function(date){
	return new ApplyDates(date).saveAsync();
}

module.exports.findDate = function(searchStr){
	return ApplyDates.findAsync(searchStr);
}