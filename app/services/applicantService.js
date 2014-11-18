var Promise = require('bluebird');
var Applicant = require('../models/applicant');
var Bcrypt = require('../middleware/bcrypt');

Promise.promisifyAll(Applicant);
Promise.promisifyAll(Applicant.prototype);

module.exports.getApplicantById = function(id){
	return Applicant.findByIdAsync(id);
}

module.exports.saveApplicant = function(applicant){
	//This will hash the password
	applicant.password = Bcrypt.generateHash(applicant.password);
	//Creates a new User
	return new Applicant(applicant).saveAsync();
}

module.exports.updateApplicant = function(applicant, id){
	return Applicant.findOneAndUpdateAsync({_id: id}, applicant);
}