
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const UserModel = require('../models/users_model');
const dotenv  =require('dotenv');
dotenv.config();

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        // find the user specified in token
        const user = await UserModel.findById(payload.sub);
        //if user doesn't exist , handle it
        if (!user) {
            return done(null, false);
        }
        //otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Google Oauth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {

    try {
        console.log('accesToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);

        // check wether this current user exist in our DB
        const existingUser = await UserModel.findOne({
            "google.id": profile.id
        });
        if (existingUser) {
            console.log('User Already exist in our DB');
            return done(null, existingUser);
        }
        console.log('User doesn\' t exist in our DB, we\'re creating new one');
        // If new Account
        const newUser = new UserModel({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}))

// FACEBOOK STRATEGY

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('accesToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        // check wether this current user exist in our DB
        const existingUser = await UserModel.findOne({
            "facebook.id": profile.id
        });
        if (existingUser) {
            console.log('User Already exist in our DB');
            return done(null, existingUser);
        }
        console.log('User doesn\' t exist in our DB, we\'re creating new one');
        // If new Account
        const newUser = new UserModel({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}))

//LOCAL STRATEGY

passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {

    try {
        // console.log('email',email);
        // find the user given the email
        const user = await UserModel.findOne({
            "local.email": email
        });
        //console.log(user);

        //if not, handle it
        if (!user) {
            return done(null, false);
        }

        // check if password is corret
        const isMacth = await user.isValidPassword(password);

        console.log('isMatch', isMacth);

        //if not, handle it
        if (!isMacth) {
            return done(null, false);
        }

        // otherwise return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}));