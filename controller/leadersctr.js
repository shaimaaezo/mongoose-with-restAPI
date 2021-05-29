const mongoose = require('mongoose')

const leadersModel = require('./../models/leaders.js')

exports.GetAllDishes = async(req,res,next) => {
  leadersModel.find({}).then((promo) => {
    if(promo != null){
      res.statusCode = 200
      res.setHeader('Content-Type' , 'application/json')
      res.json(promo)
    }else{
      const err = `there are no leader`
      next(err)
    }
  }).catch(()=>{res.end('there are no leader in database')})
}

exports.PostAll = async(req, res, next) => {
  leadersModel.create(req.body).then((promo) => {
    res.statusCode = 200
    res.json(promo)
    //res.end('Will add the promoRouter: ' + req.body.name + ' with details: ' + req.body.description);
}).catch((err) => next(err))
}

exports.deleteAll = async(req, res, next) => {
  leadersModel.remove({}).then((resp) => {
    res.statusCode = 200
    res.setHeader('Content-Type' , 'application/json')
    res.json(resp)
    //res.end(`Deleting all leaderRouter`);
  }).catch((err) => next(err))
}

exports.getByID = async(req,res,next) => {
  leadersModel.findById(req.params.leaderId).then((promo) => {
    if(promo != null){
      res.statusCode = 200
      //res.setHeader('Content-Type' , 'application/json')
      res.json(promo)
    }else{
      res.statusCode = 404
      res.end(`this leaderRouter with: ${req.params.leaderId} ID NOT FOUND!`);
    }
  }).catch(err => next(err))
}

exports.ubdateByID = async(req, res, next) => {
    leadersModel.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true}).then((promo)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promo);
  }).catch(()=>{
    res.statusCode = 403;
    res.end('PUT operation not FOUND this ID');
  })
}

exports.removeByID = async(req, res, next) => {
  leadersModel.findByIdAndRemove(req.params.leaderId).then((resp) => {
    if(resp != null){
      res.statusCode = 200
      res.end(`Deleting ${req.params.leaderId}`);
    }else{
      res.statusCode = 404
      next('there are an error in api ')
    }
  }).catch(() =>{ res.end(`from catch leaderRouter with: ${req.params.leaderId} ID NOT FOUND!`)} )
}
