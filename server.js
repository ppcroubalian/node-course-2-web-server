const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
var log =`${now}: ${req.method} for ${req.url}`;
console.log(log);
fs.appendFile('serverLog.txt',log+'\n', (err) => {
  if (err) {
    console.log('Unable to write to server log');
  }
});
  next();
});

// USE TO STOP SITE DURING maintenance
/*
app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
*/


app.use(express.static(__dirname));

// HELPERS
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// END HELPERS


// ROUTES
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: "Home Page",
    welcomeMsg: 'Hi Ya, welcome to our completely bullshit site!'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: "About Us Page"
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port.... wait for it..... 3000');
});
