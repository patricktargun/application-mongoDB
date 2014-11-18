"use strict";

var bcrypt   = require('bcrypt-nodejs');

// methods ======================
// generating a hash when creating a password
module.exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
