const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


const user_router = require('./routes/user_router');
const menu = require('./routes/menu');
const page = require('./routes/page');
const post = require('./routes/postRouter');
const profil_perusahaan = require('./routes/dataperusahaan_router');
const sendResetKode = require('./routes/sendmailKodeReset_Router');

const dotenv  =require('dotenv');
const recaptcha = require('./routes/recaptcha_router');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

var server = require('http').createServer(app);  
var io = require('socket.io')(server);

dotenv.config();


//connect to mongoose
mongoose.connect(process.env.DB_URL);
//on connected
mongoose.connection.on('connected', () => {
    console.log('connected to database', process.env.DB_URL);

/*
    // To List all Collections of a Database
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
        } else {
            names.forEach(function (e, i, a) {
                mongoose.connection.db.dropCollection(e.name);
                console.log("----->", e.name);
            });
        }
    });
    mongoose.connection.db.collection('usermodels').count(function(err, count) {
        console.dir(err);
        console.dir(count);
    
        if( count == 0) {
            console.log("No Found Records.");
            
        }
        else {
            console.log("Found Records : " + count);
        }
    });*/

});
mongoose.connection.on('error', (err) => {
    console.log('connected to database error', err);
});


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '9999mb'}));
app.use(cors());




//Routes
app.use('/api', user_router);
app.use('/api', menu);
app.use('/api', page);
app.use('/api', post);
app.use('/api', profil_perusahaan);
app.use('/api', sendResetKode);
app.use(recaptcha);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('invaild endpoint');
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



//Start the server
const port = process.env.PORT || 3000;
//app.listen(port);
server.listen(port);  
console.log('Server listen at', port);