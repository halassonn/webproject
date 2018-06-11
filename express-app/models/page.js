const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//page schema
const PageSchema = new Schema({

    namahalaman: {
        type: String,
        //require: true
    },
    content: {
        type: String,
        //require: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'menu'
    },
});

const Page = module.exports = mongoose.model('page', PageSchema);

module.exports = Page;

/*module.exports.addpage = function (page, callback) {
    Page.create(page, callback);
};
module.exports.getAll = function (callback, limit) {
    Page.find(callback).limit(limit);
};
module.exports.getPageByName = function (namahalaman, callback) {
    Page.find({
        namahalaman: namahalaman
    }, callback);
};

module.exports.updatepage = function (id, page, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        namahalaman: page.namahalaman,
        content: page.content,
        _menu: page.menu
    }
    Page.findOneAndUpdate(query, update, options, callback)
};
module.exports.deletepage = function (id, callback) {
    var query = {
        _id: id
    };
    Page.deleteOne(query, callback);
}; */