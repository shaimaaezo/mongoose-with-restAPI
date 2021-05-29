const mongoose = require('mongoose')

const dishModel = require('./../models/dishes.js')

exports.GetAllDishes = async (req , res , next) => {
  dishModel.find({}).then((dishes) => {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json(dishes)
  },(error)=>{console.log(error)})
}

exports.PostAll = async(req , res , next) => {
  console.log(req.body)
  dishModel.create(req.body).then((dish) => {
    console.log('Dish Created ', dish)
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json(dish)
  }
).catch((err) => {console.log(err)})
}

exports.deleteAll = async(req,res,next) => {
  dishModel.remove({}).then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json(resp)
    console.log(res.json(dishes))
  }).catch((err) => {next(err)})
}
