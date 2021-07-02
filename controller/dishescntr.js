const mongoose = require('mongoose')

const dishModel = require('./../models/dishes.js')

exports.GetAllDishes = async (req , res , next) => {
  dishModel.find({}).populate('comments.auther').then((dishes) => {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json(dishes)
  },(error)=>{res.json({err:error})})
}

exports.PostAll = async(req , res , next) => {
  dishModel.create(req.body).then((dish) => {
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
  })//.catch((err) => {next(err)})
}

//dishID
exports.getById = async (req, res, next) => {
  dishModel.findById(req.params.dishId).then((dish) => {
    if(dish){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json(dish)
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

exports.updateOne = async (req, res, next) => {
  dishModel.findByIdAndUpdate(req.params.dishId,{
    $set: req.body
  },{new:true}).then((dish) => {
    if(dish){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json(dish)
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

exports.deleteOne = async (req, res, next) => {
  dishModel.findByIdAndRemove(req.params.dishId).then((resp) => {
    if(resp){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json(resp)
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

/////////////////////comments
exports.getByIdCOM = async (req, res, next) => {
  dishModel.findById(req.params.dishId).populate('comments.auther').then((dish) => {
    if(dish){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json(dish.comments)
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

exports.PostCOM = async(req , res , next) => {
  dishModel.findById(req.params.dishId).then((dish)=> {
    if(dish){
      req.body.auther = req.user._id
      dish.comments.push(req.body)
      dish.save()
      .then((dish)=>{
        dishModel.findById(dish._id).populate('comments.auther', 'username').then((dish) => {
          res.statusCode = 200;
          res.setHeader('Content-Type' , 'application/json')
          res.json(dish)
        })
      },(err)=>{res.json({err:err})
    })
  }else{
    err = new Error('Dish ' + req.params.dishId + ' not found');
    err.status = 404;
    res.json({err:err})
  }
  }).catch((err) => {res.json({err:err})})
}

exports.deleteCOM = async (req, res, next) => {
  dishModel.findById(req.params.dishId).then((dish) => {
    if(dish){
      console.log('i am here')
      for(var i = dish.comments.length-1 ; i >= 0 ; i-- ){
        dish.comments.id(dish.comments[i]._id).remove()
      }
      dish.save().then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json')
        res.json(resp)
      },(err) => {res.json({error:err})})
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

//commentId
exports.getOneCOM = async (req, res, next) => {
  dishModel.findById(req.params.dishId).populate('comments.auther','username admin').then((dish) => {
    if(dish !=null && dish.comments.id(req.params.commentId) != null){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json(dish.comments.id(req.params.commentId))
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish with "+ req.params.commentId +"  is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

exports.UpdateOneCOM = async(req , res , next) => {
  dishModel.findById(req.params.dishId).then((dish)=> {
    if(dish !=null && dish.comments.id(req.params.commentId) != null){
      dish.comments.id(req.params.commentId).comment = req.body.comment
      dish.save()
      .then((dish)=>{
        dishModel.findById(dish._id).populate('comments.auther').then((dish) => {
          res.statusCode = 200;
          res.setHeader('Content-Type' , 'application/json')
          res.json(dish)
        })
      },(err)=>{res.json({err:err})
    })
  }else{
    err = new Error('Dish ' + req.params.dishId + ' not found');
    err.status = 404;
    res.json({err:err})
  }
  }).catch((err) => {console.log(err)})
}

exports.deleteOneCOM = async (req, res, next) => {
  dishModel.findById(req.params.dishId).then((dish) => {
    if(dish !=null && dish.comments.id(req.params.commentId) != null){
      dish.comments.id(req.params.commentId).remove()
      dish.save().then((dish) =>  {
        dishModel.findById(dish._id)
        .populate('comments.author')
        .then((dish) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish);
        })
      },(err) => {res.json({err:'there are error in resp'+err})})
    }else{
      console.log('i am in else')
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this dish is not found"})
    }
  }).catch((err) => res.json({error:err}))
}
