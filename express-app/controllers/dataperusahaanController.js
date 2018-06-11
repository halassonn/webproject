var DataPerusahaan = require('../models/dataperusahaan');

module.exports = {
    index: async (req, res, next) => {
        const profils = await DataPerusahaan.find({});
        res.status(200).json(profils);
    },
    new: async (req, res, next) => {
        const newProfil = new DataPerusahaan(req.value.body);
        const profilExistsbyNama = await DataPerusahaan.findOne({
            "namaperusahaan": newProfil.namaperusahaan
        });
        const profilExistsbyEmail = await DataPerusahaan.findOne({
            "email": newProfil.email
        });
        if (profilExistsbyNama) {
            return res.status(403).json({
                error: 'Data dengan Nama Perusahaan "' + newProfil.namaperusahaan + '" is exists'
            });
        }else if(profilExistsbyEmail){
            return res.status(403).json({
                error: 'Data dengan Email  "' + newProfil.email + '" is exists'
            });
        }
        const profil = await newProfil.save();
        res.status(201).json({
            id: profil._id
        });
    }
}