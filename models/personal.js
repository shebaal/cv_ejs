const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const personal_schema=new Schema({

    id:{type:String,required:true},
    first_name:{ type:String,required:true},
    last_name:{ type:String,required:true},
    location:{ type:String,required:true},
    email:{ type:String,required:true},
    number:{type:Number,require:true,default:0},
    summery:{type:String,require:true},
    image:{type:String,required:true}
});

const personal=mongoose.model("personal",personal_schema);
module.exports=personal;