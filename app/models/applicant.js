"use strict";
// app/models/nerd.js
// grab the mongoose module
var mongoose  = require('mongoose');
var moment    = require('moment');
var bcrypt    = require('bcrypt-nodejs');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var applicant = new mongoose.Schema({
    companyName: {type : String },
    firstName: {type : String },
    lastName: {type : String },
    contactPosition: {type : String },

    email: {type : String },
    password: {type : String },

    contactPhone: {type : String },
    phoneExt: {type : String },
    zip: {type : Number },
    city: {type : String },
    state: {type : String },
    industryBucket: {type : String },
    businessDeiscription: {type : String },
    timestamp: { type: Date, required: true, default: moment().utc().toDate() },
    appAppointment: {type : String }
});

// methods ======================
// generating a hash
// applicant.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checking if password is valid
applicant.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Applicant', applicant);