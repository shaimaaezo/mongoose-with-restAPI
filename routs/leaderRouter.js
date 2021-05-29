const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');

const leaderctr = require('./../controller/leadersctr.js')

const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(leaderctr.GetAllDishes)
.post(leaderctr.PostAll)
.put((req, res, next) => {
    res.statusCode = 403;
    //res.end('PUT operation not supported on /dishes');
})
.delete(leaderctr.deleteAll);

//'/:leaderId'
leaderRouter.route('/:leaderId')
.get(leaderctr.getByID)
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.leaderId);
})
.put(leaderctr.ubdateByID)
.delete(leaderctr.removeByID);


module.exports = leaderRouter;
