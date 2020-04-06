var express = require('express');
var bodyparser = require('body-parser');
var pool = require('./connection.js');

var app = express();
var id;
app.set('view engine','ejs');



var urlencodedparser = bodyparser.urlencoded({extended:false});

app.use('/public',express.static('public'));
app.get('/home',(req,res)=>{
    res.render('entry');
});
app.post('/view',urlencodedparser,(req,res)=>{
    console.log('post view body');
    console.log(req.body);
    pool.query('SELECT * FROM projectsenu WHERE fid='+req.body.id,(err,rt)=>{
        var r1 = rt.rows[0];
        res.render('vue',{dt:r1});
    });

});
app.post('/insert',urlencodedparser,(req,res)=>{
//updating the database
    var qry="UPDATE projectsenu SET district=($1) ,facility=($2), nru=($3)  WHERE fid="+req.body.id;
    pool.query(qry,[req.body.district,req.body.facility,req.body.nru] ,(err,ress)=>{
    if(err){
        console.log(err)
    }else{
        console.log('');
    }
    res.redirect('home'); 
});
});
app.listen(3000);

