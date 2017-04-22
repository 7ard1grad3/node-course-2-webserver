/**
 * Created by ilyas on 4/21/2017.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('setUpper',(text)=>{
    return text.toUpperCase();
});
hbs.registerHelper('setBootstrapCss',()=>{
    fs.read
    return "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
});
hbs.registerHelper('setBootstrapJs',()=>{
    return 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
});
app.get('/',(res,req)=>
{
    req.render('home.hbs',{
        title: "Home page",
    })
});
app.get('/about',(res,req)=>
{
    req.render('about.hbs',{
        title: "About page",
    })
});
app.get('/bad',(res,req)=>
{
    req.send({error:"Unable to fulfil this request"});
});

app.listen(port,()=>{
    console.log(`Listening to port: ${port}`);
});