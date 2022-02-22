const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const student_schema=new Schema({

    name:{ type:String,required:true},
    age:{type:Number,require:true},
    city:{type:String,required:true}
});

const students=mongoose.model("students",student_schema);
module.exports=students;