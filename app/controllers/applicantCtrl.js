"use-strict";

var ApplicantService = require('../services/applicantService');

module.exports.getApplicant = function(req, res){
	ApplicantService.getApplicantById(req.params.id)
		.then(function(applicant){
			res.status(200).json(applicant);
		}).catch(function(err){
			res.status(500).json(err);
		});
}

module.exports.postApplicant = function(req, res) {
	ApplicantService.saveApplicant(req.body)
		.then(function(applicants){
			res.json({id: applicants[0]._id});
		}).catch(function(err){
			res.status(500).json(err);
		})
}

module.exports.editApplicant = function(req, res) {
		ApplicantService.updateApplicant(req.body, req.params.id)
			.then(function(applicants){
				res.send(applicants);
			}).catch(function(err){
				res.status(500).json(err);
			})
}