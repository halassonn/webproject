const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//page schema
const DataPerusahaanSchema = new Schema({
    namaperusahaan: {
        type: String
    },
    alamatperusahaan: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
    },
    notelp:{
        type:Number
    },
    kodepos:{
        type:Number
    },
    logo:{
        type:String
    }
});

const DataPerusahaan = module.exports = mongoose.model('dataperusahaan', DataPerusahaanSchema);
module.exports = DataPerusahaan;