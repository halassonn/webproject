const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const DataPerusahaan = require('../models/dataperusahaan');
const DataPerusahanController = require('../controllers/dataperusahaanController');

const {
    validateParam,
    validateBody,
    schemas
} = require('../helper/routerHelper');
const passport = require('passport');
const passwordJWT = passport.authenticate('jwt', {
    session: false
});
const googleToken = passport.authenticate('googleToken', {
    session: false
});
const facebookToken = passport.authenticate('facebookToken', {
    session: false
});

router.route('/profil_perusahaan')
    .get(DataPerusahanController.index)
    .post([passwordJWT, validateBody(schemas.dataPerusahaanSchema)], DataPerusahanController.new);


module.exports = router;