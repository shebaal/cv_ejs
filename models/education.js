const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const education_schema=new Schema({

    id:{type:String,required:true},
    name:{ type:String,required:true},
    date:{ type:Date,required:true},
    description:{ type:String,required:true},
 
});

const education=mongoose.model("education",education_schema);
module.exports=education;

