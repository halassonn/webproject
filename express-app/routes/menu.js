const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const Menu = require('../models/menu');
const MenuController = require('../controllers/menu');
const {
    validateParam,
    validateBody,
    schemas
} = require('../helper/routerHelper');
const passport = require('passport');
const passwordJWT = passport.authenticate('jwt',{session:false});
const googleToken = passport.authenticate('googleToken',{session:false});
const facebookToken = passport.authenticate('facebookToken',{session:false});

router.route('/menu')
    .get(MenuController.index)
    .post([passwordJWT,validateBody(schemas.menuSchema)], MenuController.newMenu);


// /menu/:id
router.route('/menu/:id')
    .get([validateParam(schemas.idSchema, 'id')], MenuController.getMenu)
    .put([passwordJWT,validateParam(schemas.idSchema, 'id'), validateBody(schemas.menuSchema)], MenuController.replaceMenu)
    .patch([passwordJWT,validateParam(schemas.idSchema, 'id'), validateBody(schemas.menuOptionalSchema)], MenuController.updateMenu)
    .delete([passwordJWT, validateParam(schemas.idSchema, 'id')], MenuController.deleteMenu);

router.route('/menu/:id/page')
    .get(validateParam(schemas.idSchema, 'id'), MenuController.getPage)
    .post([passwordJWT,validateParam(schemas.idSchema, 'id'), validateBody(schemas.menuPageSchema)], MenuController.addPage);
    

/*

router.get('/getmenus', (req, res, next) => {
    Menu.getAll((err, menu) => {
        if (err) throw err;
        return res.json({
            menu: menu
        });
    });
});

router.get('/getmenu/:namamenu', (req, res, next) => {
    Menu.getMenuByName(req.params.namamenu, (err, menu) => {
        if (err) throw err;
        return res.json({
            menu: menu
        })
    })

});

router.post('/addmenu', (req, res) => {
    var menu = req.body;
    Menu.addmenu(menu, (err, menu) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed To Add New Menu'
            });
        } else {
            res.json({
                success: true,
                msg: 'Add Menu Success'
            });
        }
    });
});


router.put('/updatemenu/:_id', (req, res) => {

    var id = req.params._id;
    var menu = req.body;
    Menu.updatemenu(id,menu,{},(err,menu)=>{
        if (err) {
            res.json({
                success: false,
                msg: 'Failed To Update Menu'
            });
        } else {
            res.json({
                success: true,
                msg: 'Update Menu Success'
            });
        }
       
    });
});
router.delete('/deletemenu/:_id', (req, res) => {

    var id = req.params._id;
    Menu.deletemenu(id,(err,menu)=>{
        if (err) {
            res.json({
                success: false,
                msg: 'Failed To Delete Menu'
            });
        } else {
            res.json({
                success: true,
                msg: 'Delete Menu Success'
            });
        }
       
    });

});


*/
module.exports = router;