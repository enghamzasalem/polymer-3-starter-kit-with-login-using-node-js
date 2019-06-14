const express = require('express')
const app = express()
const port = 4001
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World! API is Working'))
app.listen(port)
app.post('/loginapi', function(req, res) {
     //res.write("Hi from the backend");
     console.log(req.body.user);
var usertrue = '{ "passNumber":"1234321" , "username":"HamzaSalem","holderName":"Hamza Salem" ,"isuser":"True"}';
var userfalse = '{"isuser":"False"}';
var obj_true = JSON.parse(usertrue);
var obj_false = JSON.parse(userfalse);
     if (req.body.user=='admin' && req.body.password=='admin'){
         res.json(obj_true);  
          console.log("true");
        res.end();
     }else{
        res.json(obj_false);  
         console.log("false");
        res.end();
     }    
});
