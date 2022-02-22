const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const language_schema=new Schema({

    id:{type:String,required:true},
    name:{ type:String,required:true},
  
 
});

const language=mongoose.model("language",language_schema);
module.exports=language;

