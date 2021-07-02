const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const user = require('./../models/users')
const auth = require('./../authenticate.js')

var userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.get('/',(req, res, next) => {
  user.find({}).then((users) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json(users)
  }).catch((err) => {
    res.json({err:err})
  })
})

userRouter.post('/signup',(req,res,next)=>{
  user.register(new user({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json');
      res.json({errr:err})
    }else{

      passport.authenticate('local')(req, res, () => {
        var token = auth.jwtCreate({_id:req.user._id})
        if(req.body.username === 'admon'){
          user.admin = true
          user.save()
          console.log('user.admin',user.admin)
        }else{
          console.log('i am in else')
          user.admin = false
          user.save()
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true,token:token, status: 'Registration Successful!'});
      })
    }
  })
})

userRouter.post('/login',passport.authenticate('local'),(req,res)=>{
  //console.log(req)
  var token = auth.jwtCreate({_id:req.user._id})
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token:token , status: 'You are successfully logged in!'})
})


module.exports = userRouter
