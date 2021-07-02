const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');

const promoctr = require('./../controller/promotionctr.js')
const auth = require('./../authenticate.js')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(promoctr.GetAllDishes)
.post(auth.verifyUser,auth.verifyAdmin,promoctr.PostAll)
.put((req, res, next) => {
    res.statusCode = 403;
    //res.end('PUT operation not supported on /dishes');
})
.delete(auth.verifyUser,auth.verifyAdmin,promoctr.deleteAll);

//'/:promoId'
promoRouter.route('/:promoId')
.get(promoctr.getByID)
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.promoId);
})
.put(auth.verifyUser,auth.verifyAdmin,promoctr.ubdateByID)
.delete(auth.verifyUser,auth.verifyAdmin,promoctr.removeByID);

module.exports = promoRouter;
