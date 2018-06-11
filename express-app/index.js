const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//connect to mongoose
mongoose.connect(config.database);
//on connected
mongoose.connection.on('connected', () => {
    console.log('connected to database', config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('connected to database error', err);
});


const app = express();
const users = require('./routes/users');
const menu = require('./routes/menu');
const page = require('./routes/page');


//port number
const port = 3000;

// cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api', users);
app.use('/api', menu);
app.use('/api', page);

app.get('/', (req, res) => {
    res.send('invaild endpoint');
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen(port, () => {
    console.log('server start on port', port);
});