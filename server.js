const express   = require('express');
const app       = express();
const bcrypt    = require('bcrypt-nodejs');
const cors      = require('cors');
const knex      = require('knex');
const PORT      = 3001; //will need environment variable

//controllers created on 7-2-2020 for endpoint management
const register  = require('./controllers/register');
const signin    = require('./controllers/signin');
const profile   = require('./controllers/profile');
const image     = require ('./controllers/image');

const db = knex({
            client: 'pg',
            connection: {
                host : '127.0.0.1',
                user : 'postgres',
                password : 'hq1tDOCSUP1234!!!',
                database : 'smartbrain'
            }
  });

// Middleware methods
app.use(express.json());
app.use(cors()); //using CORS to handle cross origin security
// end Middleware methods.

// Route for endpoint root '/'
app.get('/', (req, res)=> {
    res.json("Root endpoint. Application Server Listening on Port 3001");
});

// Route for endpoint /signin
app.post('/signin', (req, res) => {
        signin.handleSignin(req, res, db, bcrypt);
    });

// Route for endpoint /register
app.post('/register', (req, res) => { 
        register.handleRegister(req, res, db, bcrypt);
    });

// Route for endpoint /profile/:id
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
    });

// Route for endpoint /image
app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

// Clarifai route for endpoint /image
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
});

// Define port to listen on.
app.listen(PORT, () => {
    console.log (`Success. Application Server is listening on Port ${PORT}.`);
});