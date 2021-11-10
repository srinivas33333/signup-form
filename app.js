 //jshint esversion:6

const express = require('express') ;
const bodyParser = require('body-parser') ;
const request = require('request') ;
// const e = require('express');
const https = require('https') ;

const app = express() ;

app.use(bodyParser.urlencoded({extended:true})) ;
app.use(express.static("public")) ;

app.get('/',function(req,res){
    res.sendFile(__dirname + "/signup.html") ;
   
   
}) ;

app.post('/',function(req,res){

     const firstname = req.body.fName;
      const lastname  = req.body.lName ;
     const email = req.body.email ;

    const data = {

        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    } ;

    const jsonData = JSON.stringify(data) ;

// dfea8b2f7d   dfea8b2f7d
const url = "https://us5.api.mailchimp.com/3.0/lists/dfea8b2f7d" ;

const Options = {
    method : "POST",
    auth : "sri0:ef80619c06435c956feb077430015af3-us5"
};

   const request=  https.request(url,Options,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html") ;
    }
    else{
        res.sendFile(__dirname+"/failure.html") ;
    }
     response.on("data",function(data){
         console.log(JSON.parse(data));
     }) ;
    } );

    // request.write(jsonData);
    request.end() ;
}) ;

app.post('/failure',function(req,res){
     res.redirect("/") ;
});

app.listen(3000 || process.env.PORT,function(){
    console.log('server runs');
}) ;







// dfea8b2f7d
// dfea8b2f7d.
// 38ed977ef2a17deaf1b322d51f0ef0f4-us5