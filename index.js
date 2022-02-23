const express = require("express");
const multer = require("multer");
const mogoose = require("mongoose");
const Student = require("./models/student");
const Product = require("./models/products");
const Personal = require("./models/personal");
const Education = require("./models/education");
const Skill = require("./models/skills");
const experiance = require("./models/experiance");
const { default: mongoose } = require("mongoose");

const person = require("./models/personal");
const language = require("./models/language");
const app = express();
app.use(express.static("public/"))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg")
      cb(null, "public/images/");
    else if (file.mimetype == "application/pdf") cb(null, "public/pdf/");
   
  },
  filename: (req, file, cb) => {
    var extension = file.originalname.split(".");
    var ext = extension[extension.length - 1];

    //var uploaded_file_name =Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname;
    var uploaded_file_name =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      ext;

    cb(null, uploaded_file_name);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else callback(null, false);
  },
  limits: 1024 * 1024 * 5,
});
app.set("view engine", "ejs");
app.use(express.urlencoded());

mogoose
  .connect("mongodb://localhost:27017/coding_academy")
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/home", auth, (req, res) => {
  res.render("home");
});

app.post("/add_user", (req, res) => {
  const s = new Student({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  });

  s.save();

  res.end();

  res.render("user_info", { info: req.body });
});

app.get("/product/add", auth, (req, res) => {
  res.render("create_product");
});
app.post("/product/add", upload.single('p_image'), (req, res) => {
  
   // console.log(req.file.filename);
  const p=new Product({
        id:mongoose.Types.ObjectId,
        name:req.body.p_name,
        price:req.body.p_price,
        quantity:req.body.p_quantity,
        description:req.body.p_description,
        image:req.file.filename
        
    });
    p.save((error,result)=>{
        if(error)
       console.log(error.message);
        else
        console.log(result);
        

    });

    console.log("data inserted successful");
    res.end();
    
});

app.get('/product/list',(req,res)=>{
Product.find().then((reslut)=>{

        //console.log(allProducts.length);

        res.render('show_products',{products:reslut});
    });
  
});


app.get("/person/add", auth, (req, res) => {
  res.render("create_personal");
});
app.post("/person/add", upload.single('p_image'), (req, res) => {
  
   // console.log(req.file.filename);
  const p=new Personal({
        id:mongoose.Types.ObjectId,
        name:req.body.p_name,
        number:req.body.p_price,
        description:req.body.p_description,
        l_name:req.body.pl_name,
        email:req.body.p_email,
        image:req.file.filename
        
    });
    p.save((error,result)=>{
      
        if(error)
       console.log(error.message);
        else
        console.log(result);
        

    });

    console.log("data inserted successful");
    res.end();
    
});

app.get("/", auth, (req, res) => {
  res.render("index");
});

app.get("/people", auth, (req, res) => {
  Personal.find().then((reslut)=>{

    res.render("People",{personal:reslut});
});

});

app.get('/people/delete/(:id)', function(req, res, next) {
  Personal.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/people');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})
app.get("/education", auth, (req, res) => {
  Education.find().then((reslut)=>{


    res.render('Education',{education:reslut});
});

});
app.get("/education/add",auth,(req, res)=>
{
  res.render("create_education")
})

app.post("/education/add", upload.single('p_image'), (req, res) => {
  
  // console.log(req.file.filename);
 const p=new Education({
       id:mongoose.Types.ObjectId,
       name:req.body.place_name,
       date:req.body.date,
       description:req.body.p_description,
      
   });
   p.save((error,result)=>{
     
       if(error)
      console.log(error.message);
       else
       console.log(result);
       

   });

   console.log("data inserted successful");
   res.end();
   
});

app.get('/education/delete/(:id)', function(req, res, next) {
  Education.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/education');
      } else {
          console.log('Failed to Delete education Details: ' + err);
      }
  });
})

app.get("/skills", auth, (req, res) => {
  Skill.find().then((reslut)=>{


    res.render('skills',{skill:reslut});
});
});
app.get("/skills/add",auth,(req, res)=>
{
  res.render("create_skill")
})

app.post("/skills/add", upload.single('p_image'), (req, res) => {
  
  // console.log(req.file.filename);
 const p=new Skill({
       id:mongoose.Types.ObjectId,
       name:req.body.myskill,
      
      
   });
   p.save((error,result)=>{
     
       if(error)
      console.log(error.message);
       else
       console.log(result);
       

   });

   console.log("data inserted successful");
   res.end();
   
});
app.get('/skills/delete/(:id)', function(req, res, next) {
  Skill.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/skills');
      } else {
          console.log('Failed to Delete skill Details: ' + err);
      }
  });
})


app.get("/experiance", auth, (req, res) => {
  experiance.find().then((reslut)=>{
    res.render('experiance',{experiance:reslut});
});
});
app.get("/experiance/add",auth,(req, res)=>
{
  res.render("create_experiance")
})

app.post("/experiance/add", upload.single('p_image'), (req, res) => {
  
  // console.log(req.file.filename);
 const p=new experiance({
       id:mongoose.Types.ObjectId,
       name:req.body.place_name,
       date:req.body.date,
       description:req.body.p_description,
      
   });
   p.save((error,result)=>{
     
       if(error)
      console.log(error.message);
       else
       console.log(result);
       

   });

   console.log("data inserted successful");
   res.end();
   
});
app.get('/experiance/delete/(:id)', function(req, res, next) {
  experiance.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/experiance');
      } else {
          console.log('Failed to Delete experiance Details: ' + err);
      }
  });
})

app.get("/language", auth, (req, res) => {
  language.find().then((reslut)=>{
    res.render('language',{language:reslut});
});

});
app.get("/language/add",auth,(req, res)=>
{
  res.render("create_languge")
})

app.post("/language/add", upload.single('p_image'), (req, res) => {
  
  // console.log(req.file.filename);
 const p=new language({
       id:mongoose.Types.ObjectId,
       name:req.body.language,
      
      
   });
   p.save((error,result)=>{
     
       if(error)
      console.log(error.message);
       else
       console.log(result);
       

   });

   console.log("data inserted successful");
   res.end();
   
});

app.get('/language/delete/(:id)', function(req, res, next) {
  language.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/language');
      } else {
          console.log('Failed to Delete language Details: ' + err);
      }
  });
})


function auth(req, res, next) {
  next();
}

app.listen("3000");
