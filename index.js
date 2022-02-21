const express = require("express");
const multer = require("multer");
const mogoose = require("mongoose");
const Student = require("./models/student");
const Product = require("./models/products");
const Personal = require("./models/personal");
const { default: mongoose } = require("mongoose");
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


app.get("/personal/add", auth, (req, res) => {
  res.render("create_personal");
});
app.post("/personal/add", upload.single('p_image'), (req, res) => {
  
   // console.log(req.file.filename);
  const pe=new Personal({
  
        id:mongoose.Types.ObjectId,
        first_name:req.body.f_name,
        last_name:req.body.l_name,
        location:req.body.lo_name,
        email:req.body.e_name,
        number:req.body.n_number,
        summery:req.body.pe_summery,
        image:req.file.pe_image
        
    });
    pe.save((error,result)=>{
        if(error)
       console.log(error.message);
        else
        console.log(result);
        

    });

    console.log("data inserted successful");
    res.end();
    
});

function auth(req, res, next) {
  next();
}

app.listen("3000");
