const mongoose = require('mongoose')

const Schema = mongoose.Schema

const leaders = new Schema({
  name:{type:String},
  image: {type:String},
  designation:{type:String},
  abbr:{type:String},
  description: {type:String},
  featured: {type:Boolean},
})

module.exports = mongoose.model('leaders',leaders)
