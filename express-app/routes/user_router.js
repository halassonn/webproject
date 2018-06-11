const express = require('express');
const router = require('express-promise-router')();
const UserController = require('../controllers/user_controller');
const { validateParam, validateBody, schemas } = require ('../helper/routerHelper');
const { validCaptcha } = require ('../helper/recaptcha');
const passport = require('passport');
const passportConf = require('../config/passport2');


const passwordSignIn = passport.authenticate('local',{session:false});
const passwordJWT = passport.authenticate('jwt',{session:false});
const googleToken = passport.authenticate('googleToken',{session:false});
const facebookToken = passport.authenticate('facebookToken',{session:false});

router.route('/signup')
.post( [validateBody(schemas.daftarSchema),validCaptcha()], UserController.signUp);

router.route('/signin')
.post([validateBody(schemas.authSchema),validCaptcha() ],passwordSignIn,UserController.signIn);
//.post(validateBody(schemas.authSchema),UserController.captcha,passwordSignIn,UserController.signIn);


router.route('/oauth/google')
.post(googleToken,UserController.googleOAuth);

router.route('/oauth/facebook')
.post(facebookToken,UserController.facebookOAuth);

router.route('/secret')
.get(passwordJWT, UserController.secret);
router.route('/user/reset')
.post( [validateBody(schemas.resetPassworSchema),validCaptcha()], UserController.resetpassword);

router.route('/checkuser')
.get(UserController.checkuserisempty);
router.route('/activate')
.put([validateBody(schemas.aktivasiSchema),validCaptcha()], UserController.aktivateUser);

module.exports = router;