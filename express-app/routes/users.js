const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
//Register

router.post('/register', (req, res, next) => {
    let newUser = new User({
        nama: req.body.nama,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed To Add New User'
            });
        } else {
            res.json({
                success: true,
                msg: 'Add user success'
            });
        }
    });

});
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not Found'
            });
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        nama: user.nama,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }

        });

    });
});
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});
router.get('/profiles', (req, res, next) => {
    User.getUsers((err, user) => {
        if (err) throw err;
        return res.json({
            success:true,
            user:user
        })
    }); 
  

});

//validate
router.get('/validate', (req, res, next) => {
    res.send('Validate');
});

module.exports = router;