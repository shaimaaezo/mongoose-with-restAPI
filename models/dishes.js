const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  comment:{type:String,required:true},
  auther: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    //timestamps: true
})

const dishesCollec = new Schema({
//  _id:mongoose.Schema.Types.ObjectId,
  name:{type:String,required:true},
  description:{type:String,required:true},
  comments:[commentsSchema],
  //images:{type:String},
},{
    timestamps:true
})

module.exports = mongoose.model('dishes',dishesCollec)
