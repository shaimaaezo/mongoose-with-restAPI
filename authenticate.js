const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
var ExtractJwt = require('passport-jwt').ExtractJwt
var JwtStrategy = require('passport-jwt').Strategy
var jwt = require ('jsonwebtoken')

const user = require('./models/users.js')
const dish = require('./models/dishes.js')
const config = require ('./config.js')

//local stratigey
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

//create jwt
exports.jwtCreate = function (user){
  return jwt.sign(user , config.secreteKey , {expiresIn: 3600})
}

//jwt stratigy
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secreteKey;

exports.jwtPassportStrategy = passport.use(new JwtStrategy(opts , (jwt_payLoad ,done)=>{
  console.log('jwt_payLoad:' , jwt_payLoad);
  user.findOne({_id:jwt_payLoad._id},(err,user)=>{
    if(err){
      done(err,false)
    }
    else if(user){
      done(null,user)
    }
    else{
      done(null,false)
    }
  })
}))

//verify users
exports.verifyUser = passport.authenticate('jwt',{sesssion:false})

//verif admin
exports.verifyAdmin = (req,res,next)=>{
  console.log('this is user object ::::::',req.user.admin)
  if(req.user.admin){
    console.log('***********')
    next()
  }else{
    res.status(403)
    .json({error: "You are not authorized to perform this operation!"})
  }
}

//is the same user
exports.IsSame = (req, res, next) => {
    dish.findById(req.params.dishId).then((dish) => {
      //var id = dish.comments.find(auther => auther === req.user._id)
      //if()
      //.comment
      //dish.comments.map(item =>{
      console.log(dish.comments.id(req.params.commentId).auther)
        if(dish.comments.id(req.params.commentId).auther.equals(req.user._id)){
          next()
        }//else if(req.user.admin){
          //console.log('it is else if')
            //next()
      //  }
        else{
          res.status(400)
          .json({error: "ops! you cant delete this comment"})
        }
      //})
    })
  }
