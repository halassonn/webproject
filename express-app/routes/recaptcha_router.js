const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const request = require('request');
const UserModel = require('../models/users_model');

router.post('/captcha', (req, res, next) => {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null) {
        return res.json({
            "responseError": "Please select captcha first"
        });
    }
    const secretKey = "6LeJY10UAAAAAKtQOm0WFSmkEvHdY01UAEnItwaV";

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    request(verificationURL, (error, response, body) => {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({
                "success": false,
                message: "Failed captcha verification"
            });
        }
        const user = UserModel.findOne({
            "local.email": req.body.email
        }, (err, user) => {
           // console.log(user);
            if (!user) {
                return done(null, false);
            }
    
            // check if password is corret
            const isMacth = user.isValidPassword(req.body.password);
            //console.log(isMacth);
             console.log('isMatch', isMacth);
    
           
        });

       

    });
})
module.exports = router;