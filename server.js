const express   = require('express');
const app       = express();
const bcrypt    = require('bcrypt-nodejs');
const cors      = require('cors');
const knex      = require('knex');
const PORT      = process.env.PORT;

//controllers created on 7-2-2020 for endpoint management
const register  = require('./controllers/register');
const signin    = require('./controllers/signin');
const profile   = require('./controllers/profile');
const image     = require ('./controllers/image');

//only use next line for demo web apps. not best practice
//for production environment.  next statement is needed
//to resolve SSL certificate issues with Hobby-Free version
//on Heroku.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            }
  });

// Middleware methods
app.use(express.json());
app.use(cors()); //using CORS to handle cross origin security
// end Middleware methods.

// Route for endpoint root '/'
app.get('/', (req, res)=> {
    res.json(`Root endpoint. Application Server Listening on Port ${PORT}`);
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
app.listen(PORT || 3000, () => {
    console.log (`Success. Application Server is listening on Port ${PORT}.`);
});