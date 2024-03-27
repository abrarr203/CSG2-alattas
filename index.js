const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser('STUDY NOT STUDYING'));
app.use(session({
    secret: "BRAIN NOT BRAINING",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
    },
}));

app.use('/', require('./routes/pages'));


const port = process.env.PORT || 9000; 
app.listen(port, () =>{ 
    console.log(`server is on ${port}`);
})