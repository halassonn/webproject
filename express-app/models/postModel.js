const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String
    },
    kategory:{
        kategory:String
    },
    postcontent: {
        type: String
    },
    status:{
        type:Boolean
    },
    createat: {
        type: Date
    },
    updateat:{
        type:Date
    },
    publishat: {
        type: Date
    }
});
const PostModel = module.exports = mongoose.model('postmodel', PostSchema);
module.exports = PostModel;