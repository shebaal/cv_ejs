const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const skill_schema=new Schema({

    id:{type:String,required:true},
    name:{ type:String,required:true},
  
 
});

const skills=mongoose.model("skills",skill_schema);
module.exports=skills;

