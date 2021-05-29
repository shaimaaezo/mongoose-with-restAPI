const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema

const promotions = new Schema({
  name:{type:String},
  image:{type:String},
  label: {type:String,default:''},
  price:{type:Currency},
  description: {type:String},
  featured: {type:Boolean},
})

module.exports = mongoose.model("promotions" ,promotions )
