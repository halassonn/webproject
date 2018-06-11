const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//user schema
const UserModelSchema = new Schema({
    method: {
        type:String,
        enum: ['local','google','facebook'],
        required:true
    },
    local: {
        email: {
            type: String,
            lowercase: true,
            //unique:true
        },
        password: {
            type: String
        },
        status:{
            type:Boolean
        },
        aktifasikode:{
            type:String
        },
        aktifasikodeexp:{
            type:String
        },
        passwordresetkode:{
            type:String
        },
        passwordresetkodeexp:{
            type:Date
        },
       
       
    },
    google: {
        id:{
            type: String
        },
        email: {
            type: String,
            lowercase: true,
            //unique:true
        },
        status:{
            type:Boolean
        },
        aktifasikode:{
            type:String
        },
        aktifasikodeexp:{
            type:Date
        },
        passwordresetkode:{
            type:String
        },
        passwordresetkodeexp:{
            type:Date
        },
        
    },
    facebook: {
        id:{
            type: String
        },
        email: {
            type: String,
            lowercase: true,
            //unique:true
        },
        status:{
            type:Boolean
        },
        aktifasikode:{
            type:String
        },
        aktifasikodeexp:{
            type:Date
        },
        passwordresetkode:{
            type:String
        },
        passwordresetkodeexp:{
            type:Date
        },
    }
   
});

UserModelSchema.pre('save', async function (next){
    try {
        if(this.method !== 'local'){
            next();
        }
       console.log('pre save called');
        // generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate Password Hash
        const passwordHash = await bcrypt.hash(this.local.password, salt);
         console.log('salt',salt);
        console.log('normal password',this.local.password);
        console.log('hash password', passwordHash);
        // save password hash
        this.local.password = passwordHash;
        next();

    } catch (error) {
        next(error);
    }
});


UserModelSchema.methods.isValidPassword= async function(newPassword){
    try {
       // console.log('this.local.password',this.local.password);
        //console.log('newPassword',newPassword);

        return await bcrypt.compare(newPassword,this.local.password);
        
    } catch (error) {
        throw new Error(error);
    }
}

const UserModel = module.exports = mongoose.model('UserModel', UserModelSchema);
module.exports = UserModel;