const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');

const leaderctr = require('./../controller/leadersctr.js')
const auth = require('./../authenticate.js')

const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(leaderctr.GetAllDishes)
.post(auth.verifyUser,auth.verifyAdmin,leaderctr.PostAll)
.put((req, res, next) => {
    res.statusCode = 403;
    //res.end('PUT operation not supported on /dishes');
})
.delete(auth.verifyUser,auth.verifyAdmin,leaderctr.deleteAll);

//'/:leaderId'
leaderRouter.route('/:leaderId')
.get(leaderctr.getByID)
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.leaderId);
})
.put(auth.verifyUser,auth.verifyAdmin,leaderctr.ubdateByID)
.delete(auth.verifyUser,auth.verifyAdmin,leaderctr.removeByID);


module.exports = leaderRouter;
