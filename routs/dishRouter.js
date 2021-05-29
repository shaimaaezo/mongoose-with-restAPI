const express = require('express')
const http = require('http');

const DishesContr = require('./../controller/dishescntr.js')

const dishRouter = express.Router()

dishRouter.route('/')
.get(DishesContr.GetAllDishes)
.post(DishesContr.PostAll

)
.put((req, res, next) => {
    res.statusCode = 200;
    res.end('PUT operation not supported on /dishes');
})
.delete(DishesContr.deleteAll);


//'/:dishId',
dishRouter.route('/:dishId')
.all((req,res,next)=>{
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
  res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end(`Deleting ${req.params.dishId}`);
});

module.exports = dishRouter;
