var UserModel = require('../models/users_model');
const JWT = require('jsonwebtoken');
const async = require('async');
const mongoose = require('mongoose');
const senEmail = require('./sendmail');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

signToken = user => {
    return JWT.sign({
        iss: 'Halasson',
        sub: user.id,
        iat: new Date().getTime(), //Current Time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, process.env.JWT_SECRET);
}

module.exports = {

    signUp: async (req, res, next) => {
        // Email and password
        const {
            email,
            password,
            password_confirm
        } = req.value.body;

        // check if user exist with email
        const foundUser = await UserModel.findOne({
            "local.email": email
        });
        
        if (foundUser) {
            return res.status(403).json({
                message: 'Email Sudah Terdaftar'
            });
        }
       async.waterfall([

            //create Kode Reset PAssword
            function (done) {
                crypto.randomBytes(3, function (err, buf) {
                    var kode = buf.toString('hex').toUpperCase();
                    done(err, kode);
                });
            },

            //find user by email and save the code
            function (kode, done) {
                UserModel.findOne({
                    "local.email": email
                }, function (err, user) {
                    //user = new User({method:'local'});

                    if (!user) {
                        user = new UserModel({
                            method: 'local',
                            local: {
                                email: email,
                                password: password,
                                status: false,
                                aktifasikode: kode,
                                aktifasikodeexp: Date.now() + 3600000

                            }
                        });
                        user.save(function (err) {
                            if (err) {
                                console.log('simpan error', err)
                            }
                            done(err, kode, user);
                        });
                    }

                });
            },
            // kirim kode to email
            function (kode, user, done) {
                console.log('step 2');
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'wolf86gtm@gmail.com',
                        pass: 'reyhan241186'
                    }
                });
                var mailOptions = {
                    to: email,
                    from: 'Si Raja Sonang',
                    html: '<p>Hai ' + email + ',' +
                        'terimakasih telah membuat akun di aplikasi kami.</br>' +
                        'Silahkan Gunakan Kode Berikut : ' + kode + ' untuk aktivasi user!!'
                    //'Silahkan verifikasi email dengan mengklik link berikut:</br> ' +
                    // '<a href=http://' + req.headers.host + '/api/reset/' + kode + '>Konfirmasi</a>'
                };
                console.log('step 3');
                smtpTransport.sendMail(mailOptions, function (err) {
                    //req.flash('SaveSuccess', 'Kode Reset Password telah dikirim ke ' + req.body.email);
                    if (err) {
                        user.remove();
                        return res.status(500).json({
                            message: "No Internet Connection"
                        });
                        
                    }
                    res.status(200).json({
                        message: 'Kode Aktivasi telah dikirim ke ' + email
                    });
                });
            }
        ], function (err) {
            if (err) {
                res.status(400).json({
                    message: err
                });
                //delete user
                const userdelte = UserModel.findOne({
                    email: email
                });
                userdelte.remove();
            }


        });
    },
    checkuserisempty: async (req, res, next) => {

        mongoose.connection.db.collection('usermodels').count(function (err, count) {
            console.dir(err);
            console.dir(count);

            if (count == 0) {
                console.log("No Found Records.");
                res.status(200).json({
                    user_exists: false
                });
            } else {
                console.log("Found Records : " + count);
                res.status(200).json({
                    user_exists: true
                });
            }
        });

    },
    signIn: async (req, res, next) => {
        const email = req.value.body.email;
        

        UserModel.findOne({
            "local.email": email
        }, function (err, user) {
            console.log('status user', user.local.status);
            if (!user.local.status) {
                res.status(405).json({
                    message: 'User not Activated'
                })
            } else {
                token = signToken(req.user);
                res.status(200).json({
                    token
                });
            }
        })
        
    },

    googleOAuth: async (req, res, next) => {
        console.log('req.user', req.user);
        //generate token
        const token = signToken(req.user);
        res.status(200).json({
            token
        });
    },
    facebookOAuth: async (req, res, next) => {
        console.log('req.user', req.user);
        //generate token
        const token = signToken(req.user);
        res.status(200).json({
            token
        });
    },
    secret: async (req, res, next) => {
        res.send('SignUp');
    },
    resetpassword: async (req, res, next) => {

        async.waterfall([
            function (done) {
              
                UserModel.findOne({
                    "local.passwordresetkode": req.value.body.passwordresetkode,
                    "local.passwordresetkodeexp": {
                        $gt: Date.now()
                    }
                }, function (err, user, next) {
                    if (!user) {
                        //req.flash('error', 'Password reset token is invalid or has expired.');
                        console.log('here step 1')
                        return res.status(400).json({
                            success: false,
                            message: 'Password reset token is invalid or has expired.'
                        });
                    }


                    user.local.password = req.body.password;
                    user.local.passwordresetkode = undefined;
                    user.local.passwordresetkodeexp = undefined;
                    console.log('password' + user.local.password + 'and the user is' + user)

                    user.save(function (err) {
                        if (err) {
                            console.log('simpan error', err)
                            return res.status(400).json({
                                success: false,
                                message: err
                            })
                        }
                        done(err, user);
                    });
                });
            },

        ], function (err) {
            res.status(200).json({
                success: true,
                message: 'Password anda berhasil di reset. Silahkan Login Kembali'
            });
        });
    },

    aktivateUser: async (req, res, next) => {
        const kode = req.value.body.aktifasikode;
        UserModel.findOne({"local.aktifasikode":kode},function(err,userupdate){
            if(!userupdate){
                res.status(400).json({message:"Kode Aktivasi Anda Telah Expired"});
            }else{
                userupdate.local.aktifasikode = undefined;
                userupdate.local.aktifasikodeexp=undefined;
                userupdate.local.status =true
    
                UserModel.findOneAndUpdate({"local.aktifasikode":kode},userupdate, function(err){
                    if(err){
                        res.status(400).json({success:false,message:err})
                    }else{
                        res.status(200).json({
                            success: true,
                            message: 'User Anda telah di aktivasi, Silahkan login'
                        })
                    }
                   
                    
                });
            }
           
        });
       
       
       
        
       

    }






};