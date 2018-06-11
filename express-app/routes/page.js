const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const { validateParam, validateBody, schemas } = require ('../helper/routerHelper');
const Page = require('../models/page');
const PageController= require('../controllers/page');

const passport = require('passport');
const passwordJWT = passport.authenticate('jwt',{session:false});
const googleToken = passport.authenticate('googleToken',{session:false});
const facebookToken = passport.authenticate('facebookToken',{session:false});

router.route('/page')
.get(PageController.index)
.post([passwordJWT, validateBody(schemas.pageSchema)], PageController.newPage);

router.route('/page/:id')
.get(validateParam(schemas.idSchema,'id'), PageController.getPage)
.put([passwordJWT, validateParam(schemas.idSchema,'id'),validateBody(schemas.putPageSchema)],PageController.replacePage)
.patch([passwordJWT, validateParam(schemas.idSchema,'id'),validateBody(schemas.patchPageScema)],PageController.updatePage)
.delete([passwordJWT, validateParam(schemas.idSchema,'id')],PageController.deletePage);

module.exports = router;