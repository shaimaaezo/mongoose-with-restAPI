const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const dishesCollec = new Schema({
//  _id:mongoose.Schema.Types.ObjectId,
  name:{type:String,required:true},
  description:{type:String,required:true},
  comments:[{comment:{type:String,required:true}},{auther:{type:String,required:true}}],
  //images:{type:String},
},{
    timestamps:true
})

module.exports = mongoose.model('dishes',dishesCollec)
