var Page = require('../models/page');
var Menu = require('../models/menu');

module.exports = {
    index: async (req, res, next) => {
        const page = await Page.find({});
        res.status(200).json(page);
    },
    newPage: async (req, res, next) => {
        // 1. find the actual menu
        const menu = await Menu.findById(req.value.body.menu);

        // 2. create new page
        const newPage = new Page(req.value.body);
        delete newPage.menu;
        const page = new Page(newPage);
        await page.save();

        // 3. add newly created page to the actual menu
        menu.page.push(page);
        await menu.save();

        res.status(201).json(page);
    },

    getPage: async (req, res, next) => {
        const page = await Page.findById(req.value.params.id);
        res.status(200).json(page);
    },

    replacePage: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        // enforce that req.body must contain all the fields
        const newPage = req.value.body;
        const result = await Page.findByIdAndUpdate(id, newPage);
        res.status(200).json({
            success: true
        });
    },
    updatePage: async (req, res, next) => {
        //req.body  may content any number of fields
        const {
            id
        } = req.value.params;
        const newPage = req.value.body;
        const result = await Page.findByIdAndUpdate(id, newPage);
        res.status(200).json({
            success: true
        });
    },
    deletePage: async (req, res, next) => {
        const {
            id
        } = req.value.params;

        // get Page
        const page = await Page.findById(id);

        if(!page){
            return res.status(400).json({error:'Page doesn\'t exists'});
        }
       
        const menuId= page.menu;
         //get a menu 
        const menu = await Menu.findById(menuId);

        // Remove page
        await page.remove();
        // Remove page from menu
        menu.page.pull(page);
        //save menu 
       // await menu.save()

       //remove menu()
       await menu.remove();

        res.status(200).json({success:true});
    }
}