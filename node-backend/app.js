//Libraries
const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/dev');
require('./models/Users');
require('./services/passport');



//server configuration
const basePath = '/todo';
const port = 6200;

//Passport Library for authentications
const passport = require('passport');




// Connection to DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Routes and Backend Funcioncalities
const todoListRoutes = require('./src/routes/todoListRoutes');

// App Instance
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basePath, todoListRoutes);



app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


// Execute App
app.listen(port, () => {
  console.log('TodoList Backend running on Port: ',port);
});
