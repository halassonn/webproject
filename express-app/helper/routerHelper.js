const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            console.log('req params', req.params.value);
            if(req.params.value === undefined){
                req.params.value ='';
            }
            console.log('req params', req.params.value);
            const result = Joi.validate({
                param: req['params'][name]
            }, schema);
            if (result.error) {
                //Error happend
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
               // return res.status(400).json(result.error);
               return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }

        }
    },
    schemas: {
        menuSchema: Joi.object().keys({
            namamenu: Joi.string().required(),
            urlmenu: Joi.string().required(),
            parentmenu: Joi.empty()
        }),
        menuOptionalSchema: Joi.object().keys({
            namamenu: Joi.string(),
            urlmenu: Joi.string(),
            parentmenu: Joi.string(),
        }),
        menuPageSchema: Joi.object().keys({
            namahalaman: Joi.string().required(),
            content: Joi.string().required(),
        }),
        pageSchema: Joi.object().keys({
            namahalaman: Joi.string().required(),
            content: Joi.string().required(),
            menu: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        putPageSchema: Joi.object().keys({
            namahalaman: Joi.string().required(),
            content: Joi.string().required(),
        }),
        patchPageScema: Joi.object().keys({
            namahalaman: Joi.string(),
            content: Joi.string(),
        }),
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        authSchema: Joi.object().keys({
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().min(8).required().label('Password'),
            captcha:Joi.any()
           // password_confirm:Joi.string().label('Password Confirmation').valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'not Match with Password' } } })
        }),
        daftarSchema: Joi.object().keys({
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().min(8).required().label('Password'),
            password_confirm:Joi.string().label('Password Confirmation').valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'not Match with Password' } } }),
            captcha:Joi.any()
        }),
        newPostSchema: Joi.object().keys({
            title: Joi.string().required(),
            kategory: Joi.string().required(),
            postcontent: Joi.string().required(),
            status: Joi.boolean().empty(),
            createat: Joi.date().empty(),
            updateat: Joi.date().empty(),
            publishat: Joi.date().empty()
        }),
        updatePostSchema: Joi.object().keys({
            title: Joi.string().required(),
            kategory: Joi.string().required(),
            postcontent: Joi.string().required(),
            status: Joi.boolean().required(),
            createat: Joi.date().required(),
            updateat: Joi.date().required(),
            publishat: Joi.empty()
        }),
        postOptionalSchema: Joi.object().keys({
            title: Joi.string(),
            kategory: Joi.string(),
            postcontent: Joi.string(),
            status: Joi.boolean(),
            createat: Joi.date(),
            updateat: Joi.date(),
            publishat: Joi.empty()

        }),
        dataPerusahaanSchema: Joi.object().keys({
            namaperusahaan: Joi.string().required(),
            alamatperusahaan: Joi.string().required(),
            email: Joi.string().email().required(),
            notelp: Joi.number().required(),
            kodepos: Joi.empty(),
            logo: Joi.string().required()
        }),
        resequestkoderesetSchema: Joi.object().keys({
            email: Joi.string().email().required().label('Email'),
            captcha:Joi.any()
        }),
        resetkodeParamSchema:Joi.object().keys({
            param:Joi.string().required()
        }),
        resetPassworSchema: Joi.object().keys({
            passwordresetkode:Joi.string().required().label('Reset Code'),
            password: Joi.string().min(8).required().label('Password'),
            password_confirm:Joi.string().label('Password Confirmation').valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'not Match with Password' } } }),
            captcha:Joi.any()
        }),

        aktivasiSchema:Joi.object().keys({
            aktifasikode:Joi.string().required().label('Activate Code'),
            captcha:Joi.any()
        })
    }
}