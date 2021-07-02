const mongoose = require('mongoose');
const passportPlugin = require('passport-local-mongoose')

const Schema = mongoose.Schema;

var User = new Schema({
  firstname:{type:String ,default:''},
  lastname:{type:String ,default:''},
  admin:{type:Boolean ,default:false}
})

User.plugin(passportPlugin);

module.exports = mongoose.model('User',User)
