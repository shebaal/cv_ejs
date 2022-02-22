const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const experiance_schema=new Schema({

    id:{type:String,required:true},
    name:{ type:String,required:true},
    date:{ type:Date,required:true},
    description:{ type:String,required:true},
 
});

const experiance=mongoose.model("experiance",experiance_schema);
module.exports=experiance;

