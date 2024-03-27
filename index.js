const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Create the server application instance.
const app = express();

// Set up middleware to handle parsing of request bodies and cookies, as well as managing user sessions

app.use(express.static('public')); // Serve static files from public directory

app.set('view engine', 'ejs'); // Use EJS as view template language

// the parsed values will only be strings or arrays.
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // Sending data in the JSON format from client applications.

// app.use(cookieParser('STUDY NOT STUDYING')); //   Handle cookies using a secret key for signing them
app.use(session({ //   Manage user sessions by storing their information in the server's memory
    secret: "BRAIN NOT BRAINING",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
    },
}));

app.use('/', require('./routes/pages')); // Route requests to pages controller


const port = process.env.PORT || 9000; 
app.listen(port, () =>{ 
    console.log(`server is on ${port}`);
})