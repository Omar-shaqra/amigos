const express = require("express");
const bodyparser=require("body-parser");
const app=express();

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

var nodemailer = require('nodemailer');
//let transporter = nodemailer.createTransport(options[, defaults])
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omarshaqra26@gmail.com',
    pass: 'omarshaqra4420'
  }
});


app.listen(port,function(){
console.log("stat server on 3000");

});


app.get("/",function(req,res){



  res.render("index.ejs");

});


app.post("/",function(req,res){

  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var text = req.body.text;

  console.log(name + " " + email + " "+ phone + " " + text);


  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>

    <li>Email: ${req.body.email}</li>

    <li>Address: ${req.body.phone}</li>

  </ul>
  <h3>Message</h3>
  <p>${req.body.text}</p>`;


//  console.log(text);

  var mailOptions = {
    from: 'omarshaqra26@gmail.com' ,
    to: 'amigo@amigosshipping.com',
    subject: "shipping",
    html: output
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  var mailOptions2 = {
    from: 'amigo@amigosshipping.com' ,
    to: email,
    subject: "shipping response",
    text: 'thank you for contact us'
  };

  transporter.sendMail(mailOptions2, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

    res.redirect("/");


})



app.get("/about",function(req,res){



  res.render("about.ejs");

});
