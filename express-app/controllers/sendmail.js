const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const User = require('../models/users_model');


module.exports = {
   

    sendmail: function (req, res, done) {
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
                console.log(req.body.email);
                User.findOne({
                    "local.email": req.body.email
                }, function (err, user) {
                    //user = new User({method:'local'});

                    if (!user) {
                        return res.status(400).json({
                            message: "Email ini Tidak Terdaftar"
                        });
                    }
                    console.log('prepare', user, 'kode', kode);
                    console.log('step 1');
                    user.local.passwordresetkode = kode;
                    user.local.passwordresetkodeexp = Date.now() + 3600000; // 1 hour
                    console.log('after init user', user);

                    //done(err, kode, user);
                    user.save(function (err) {
                        if (err) {
                            console.log('simpan error', err)
                        }
                        done(err, kode, user);
                    });
                });
            },
            // kirim kode to email
            function (kode, user, done) {
                console.log('step 2');
                var smtpTransport = nodemailer.createTransport({
                    service: process.env.SEND_MAIL_SERVICE,
                    auth: {
                        user: SEND_MAIL_ADDRESS,
                        pass: SEND_MAIL_PASS
                    }
                });
                var mailOptions = {
                    to: req.body.email,
                    from: 'Si Raja Sonang',
                    html: '<p>Hai ' + req.body.email + ',' +
                        'terimakasih telah membuat akun di aplikasi kami.</br>' +
                        'Silahkan Gunakan Kode Berikut : ' + kode + ' untuk melakukan reset password!!'
                        //'Silahkan verifikasi email dengan mengklik link berikut:</br> ' +
                       // '<a href=http://' + req.headers.host + '/api/reset/' + kode + '>Konfirmasi</a>'
                };
                console.log('step 3')
                smtpTransport.sendMail(mailOptions, function (err) {
                    //req.flash('SaveSuccess', 'Kode Reset Password telah dikirim ke ' + req.body.email);
                    if(err){
                        return res.status(500).json({message:"No Internet Connection"});
                    }
                    res.status(200).json({
                        message: 'Kode Reset Password telah dikirim ke ' + req.body.email
                    });
                });
            }
        ], function (err) {
            if (err)
                res.status(400).json({
                    message: err
                });

        });
    },
    sendmail_kode_aktivasi: function(req,res,done){
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
                console.log(req.body.email);
                User.findOne({
                    "local.email": req.body.email
                }, function (err, user) {
                    //user = new User({method:'local'});

                    if (!user) {
                        return res.status(400).json({
                            message: "Email not Found"
                        });
                    }
                    console.log('prepare', user, 'kode', kode);
                    console.log('step 1');
                    user.local.passwordresetkode = kode;
                    user.local.passwordresetkodeexp = Date.now() + 3600000; // 1 hour
                    console.log('after init user', user);

                    //done(err, kode, user);
                    user.save(function (err) {
                        if (err) {
                            console.log('simpan error', err)
                        }
                        done(err, kode, user);
                    });
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
                    to: req.body.email,
                    from: 'Si Raja Sonang',
                    html: '<p>Hai ' + req.body.email + ',' +
                        'terimakasih telah membuat akun di aplikasi kami.</br>' +
                        'Silahkan Gunakan Kode Berikut : ' + kode + ' untuk aktivasi user!!'
                        //'Silahkan verifikasi email dengan mengklik link berikut:</br> ' +
                       // '<a href=http://' + req.headers.host + '/api/reset/' + kode + '>Konfirmasi</a>'
                };
                console.log('step 3');
                smtpTransport.sendMail(mailOptions, function (err) {
                    //req.flash('SaveSuccess', 'Kode Reset Password telah dikirim ke ' + req.body.email);
                    if(err){
                        return res.status(500).json({message:"No Internet Connection"});
                    }
                    res.status(200).json({
                        message: 'Kode Aktivasi telah dikirim ke ' + req.body.email
                    });
                });
            }
        ], function (err) {
            if (err)
                res.status(400).json({
                    message: err
                });

        });
    }


}

//fungsi untuk pendaftaran user dan input data ke database di sini

//berikut fungsi untuk mengirim email verifikasi user menggunakan nodemailer dan async