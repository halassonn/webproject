const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//page schema
const MenuSchema = new Schema({
    namamenu: {
        type: String
    },
    parentmenu: {
        type: String
    },
    urlmenu: {
        type: String
    },
    page:[{
        type: Schema.Types.Object, 
        ref:'page'
    }]
});

const Menu = module.exports = mongoose.model('menu', MenuSchema);
module.exports = Menu;
