"use strict";

var mongoose = require('mongoose');

var applyDates = new mongoose.Schema({
	applyDate: { type: String }
});

module.exports = mongoose.model('ApplyDates', applyDates);