const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Post = require('../models/postModel');
const PostController = require('../controllers/postController');
const {
    validateParam,
    validateBody,
    schemas
} = require('../helper/routerHelper');

const passport = require('passport');
const passwordJWT = passport.authenticate('jwt',{session:false});
const googleToken = passport.authenticate('googleToken',{session:false});
const facebookToken = passport.authenticate('facebookToken',{session:false});


router.route('/post')
    .get(PostController.index)
    .post([passwordJWT,validateBody(schemas.newPostSchema)], PostController.newPost);
  // .post(passwordJWT, PostController.newPost);


// /menu/:id
router.route('/post/:id')
    .get([validateParam(schemas.idSchema, 'id')], PostController.getPost)
    .put([passwordJWT,validateParam(schemas.idSchema, 'id'), validateBody(schemas.updatePostSchema)], PostController.replacePost)
    .patch([passwordJWT,validateParam(schemas.idSchema, 'id'), validateBody(schemas.postOptionalSchema)], PostController.updatePost)
    .delete([passwordJWT, validateParam(schemas.idSchema, 'id')], PostController.deletePost);


module.exports = router;