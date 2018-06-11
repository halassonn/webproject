const express = require('express');
const router = require('express-promise-router')();
const sendemailresetController  = require('../controllers/sendmail');
const { validateParam, validateBody, schemas } = require ('../helper/routerHelper');
const { validCaptcha } = require ('../helper/recaptcha');
router.route('/get_kode_reset')
.post([validateBody(schemas.resequestkoderesetSchema),validCaptcha()], sendemailresetController.sendmail);
        module.exports = router;