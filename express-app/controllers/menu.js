var Menu = require('../models/menu');
var Page = require('../models/page');


module.exports = {

    index: async (req, res, next) => {
        const menus = await Menu.find({});
        res.status(200).json(menus);
    },
    newMenu: async (req, res, next) => {
        const newMenu = new Menu(req.value.body);
        const menuExisit = await Menu.findOne({
            "namamenu": newMenu.namamenu
        });
        if (menuExisit) {
            return res.status(403).json({
                error: 'Menu "' + newMenu.namamenu + '" is exists'
            });
        }
        const menu = await newMenu.save();
        res.status(201).json({
            id: menu._id
        });
    },
    getMenu: async (req, res, next) => {
        //NEW WAY
        const {
            id
        } = req.value.params;
        // OLD WAY
        // const {id} = req.params;
        const menu = await Menu.findById(id);
        res.status(200).json(menu);
    },
    replaceMenu: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        const newMenu = req.value.body;
        const result = await Menu.findByIdAndUpdate(id, newMenu);
        res.status(200).json({
            success: true
        });
    },
    deleteMenu: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        const menu = await Menu.findById(id);
        if(menu){
            await menu.remove();
            res.status(200).json({
                success:true
            })
        }
       

    },
    updateMenu: async (req, res, next) => {
        //req.body  may content any number of fields
        const {
            id
        } = req.value.params;
        const newMenu = req.value.body;
        const result = await Menu.findByIdAndUpdate(id, newMenu);
        res.status(200).json({
            success: true
        });
    },
    getPageAll: async (req, res, next) => {
        const pages = await Page.find({});
        res.status(200).json(pages);
    },
    getPage: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        const menu = await Menu.findById(id).populate('page');
        console.log(menu.page);
        res.status(200).json(menu.page);

    },
    addPage: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        //create new page
        const newPage = new Page(req.value.body);
        console.log('content halaman request : ', newPage);
        //get menu
        const menu = await Menu.findById(id);
        console.log('menu', menu);
        // assign menu  as a page
        newPage.menu = menu;
        console.log('page', newPage);

        // save page
        await newPage.save();

        // add page to the menu
        menu.page.push(newPage._id);

        //save menu
        await menu.save();

        res.status(201).json(newPage);


    }




};