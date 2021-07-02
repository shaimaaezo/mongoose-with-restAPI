const express = require('express')

const DishesContr = require('./../controller/dishescntr.js')
const auth = require('./../authenticate.js')

const dishRouter = express.Router()
//
dishRouter.route('/')
.get(DishesContr.GetAllDishes)
.post(auth.verifyUser,auth.verifyAdmin,DishesContr.PostAll)
.put((req, res, next) => {
    res.statusCode = 200;
    res.end('PUT operation not supported on /dishes');
})
.delete(auth.verifyUser,auth.verifyAdmin,DishesContr.deleteAll);


//'/:dishId',
dishRouter.route('/:dishId')
.get(DishesContr.getById)
.post((req, res, next) => {
  res.statusCode = 403;
  res.json('Post operation not supported on /dishes');
})
.put(auth.verifyUser,auth.verifyAdmin,DishesContr.updateOne)
.delete(auth.verifyUser,auth.verifyAdmin,DishesContr.deleteOne);


///:dishId/comments
dishRouter.route('/:dishId/comments')
.get(DishesContr.getByIdCOM)
.post(auth.verifyUser,DishesContr.PostCOM)
.put((req, res, next) => {
  res.statusCode = 403;
  res.json('Put operation not supported on /dishes');
})
.delete(auth.verifyUser,auth.verifyAdmin,DishesContr.deleteCOM);


///:dishId/comments/:commentId
dishRouter.route('/:dishId/comments/:commentId')
.get(DishesContr.getOneCOM)
//.post()
.put(auth.verifyUser,auth.IsSame,DishesContr.UpdateOneCOM)
.delete(auth.verifyUser,auth.IsSame,DishesContr.deleteOneCOM);

module.exports = dishRouter;
