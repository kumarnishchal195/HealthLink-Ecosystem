const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/sehatDB",{useNewUrlParser:true})

const userSchema = new mongoose.Schema ({
  search: String,
});
const doctorSchema = new mongoose.Schema ({
  name:String,
  email:String,
  password:String,
  cpassword:String,
  doctorid:String
});
const PatientSchema = new mongoose.Schema({
  username:String,
  aadhar:String,
  phoneno:String

});

const Search = new mongoose.model("Search", userSchema);
const DocReg = new mongoose.model("Docreg",doctorSchema);
const UserReg = new mongoose.model("UserReg",PatientSchema)
app.get("/",function(req,res){
  res.render('pages/home')
})

app.get("/index",function(req,res){
    res.render('pages/index')
});
app.get("/profile",function(req,res){
  res.render('pages/profile')
})
app.get("/drreg",function(req,res){
  res.render('pages/drreg')
})
app.get("/drlogin",function(req,res){
  res.render('pages/drlogin')
})
app.get("/userlogin",function(req,res){
  res.render('pages/userlogin')
})
app.get("/userreg",function(req,res){
  res.render('pages/userreg')
})
// Search by Sehat Id
app.post('/index',function(req,res){
  const newUser = new Search({
    search:req.body.search,
});
newUser.save(function(err){
  if(err){
      console.log(err)
  }else{
      res.render("pages/profile")
  }
})
})

app.post('/drreg',function(req,res){
  const newDoc = new DocReg({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cpassword:req.body.cpassword,
    doctorid:req.body.doctorid
  })
  newDoc.save(function(err){
    if(err){
      console.log(err)
    }else{
      res.render('pages/index')
    }
  })
})




app.post('/userreg',function(req,res){
  const newPatient = new UserReg({
    username:req.body.username,
    aadhar:req.body.aadhar,
    phoneno:req.body.phoneno
  
  })
  newPatient.save(function(err){
    if(err){
      console.log(err)
    }else{
      res.render("pages/profile")
    }
  })
})
app.post('/drlogin',function(req,res){
  const email = req.body.email
  const password = req.body.password 
  DocReg.findOne({email:email},function(err,foundUser){
      if(err){
          console.log(err)
      }else{
          if(foundUser){
              if(foundUser.password===password){
                  res.render('pages/index')
              }
          }
      }
  })
})
app.post('/userlogin',function(req,res){
  const aadhar = req.body.aadhar
  const phoneno = req.body.phoneno
  UserReg.findOne({aadhar:aadhar},function(err,foundPatient){
    if(err){
      console.log(err)
    }else{
      if(foundPatient.phoneno === phoneno){
        res.render('pages/profile')
      }
    }
  })
})
app.listen(3000,function(){
    console.log("Server started at port 3000")
});