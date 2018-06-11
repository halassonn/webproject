const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//user schema
const UserSchema = mongoose.Schema({
    nama: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUsers = (callback) => {
    User.find(callback);
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};
module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
};
module.exports.addUser = function (newuser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newuser.password, salt, function (err, hash) {
            if (err) throw err;
            newuser.password = hash;
            newuser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};