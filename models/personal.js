// const mongoose=require('mongoose');
// const Schema=mongoose.Schema;

// const personal_schema=new Schema({

//     id:{type:String,required:true},
//     first_name:{ type:String,required:true},
//     last_name:{ type:String,required:true},
//     number:{type:Number,require:true,default:0},
//     email:{type:String,require:true},
//     image:{type:String,required:true}
// });

// const personals=mongoose.model("personal",personal_schema);
// module.exports=personals;

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const person_schema=new Schema({

    id:{type:String,required:true},
    name:{ type:String,required:true},
    description:{ type:String,required:true},
    l_name:{ type:String,required:true},
    email:{ type:String,required:true},
    number:{type:Number,require:true,default:0},
    image:{type:String,required:true}
});

const person=mongoose.model("person",person_schema);
module.exports=person;