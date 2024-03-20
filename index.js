const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', require('./routes/pages'));


const port = process.env.PORT || 9000; 
app.listen(port, () =>{ 
    console.log(`server is on ${port}`);
})