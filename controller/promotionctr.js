const mongoose = require('mongoose')

const promotionModel = require('./../models/promotions.js')

exports.GetAllDishes = async(req,res,next) => {
  promotionModel.find({}).then((promo) => {
    if(promo != null){
      res.statusCode = 200
      res.setHeader('Content-Type' , 'application/json')
      res.json(promo)
    }else{
      const err = `there are no promotions`
      next(err)
    }
  }).catch((err)=>{next(err)})
}

exports.PostAll = async(req, res, next) => {
  promotionModel.create(req.body).then((promo) => {
    res.statusCode = 200
    res.json(promo)
    //res.end('Will add the promoRouter: ' + req.body.name + ' with details: ' + req.body.description);
}).catch((err) => next(err))
}

exports.deleteAll = async(req, res, next) => {
  promotionModel.remove({}).then((resp) => {
    res.statusCode = 200
    res.setHeader('Content-Type' , 'application/json')
    res.json(resp)
    //res.end(`Deleting all promoRouter`);
  }).catch((err) => next(err))
}

exports.getByID = async(req,res,next) => {
  promotionModel.findById(req.params.promoId).then((promo) => {
    if(promo != null){
      res.statusCode = 200
      //res.setHeader('Content-Type' , 'application/json')
      res.json(promo)
    }else{
      res.statusCode = 404
      res.end(`this promoRouter with: ${req.params.promoId} ID NOT FOUND!`);
    }
  }).catch(err => next(err))
}

exports.ubdateByID = async(req, res, next) => {
    promotionModel.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true}).then((promo)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promo);
  }).catch(()=>{
    res.statusCode = 403;
    res.end('PUT operation not FOUND this ID');
  })
}

exports.removeByID = async(req, res, next) => {
  promotionModel.findByIdAndRemove(req.params.promoId).then((resp) => {
    if(resp != null){
      res.statusCode = 200
      res.end(`Deleting ${req.params.promoId}`);
    }else{
      res.statusCode = 404
      next('there are an error in api ')
    }
  }).catch(() =>{ res.end(`from catch promoRouter with: ${req.params.promoId} ID NOT FOUND!`)} )
}
