const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const mongoose = require('mongoose')
const passport = require('passport')

const config = require('./config')
const dishRouter = require('./routs/dishRouter')
const leaderRouter = require('./routs/leaderRouter')
const promoRouter = require('./routs/promoRouter')
const userRouter = require('./routs/userRouter')

const app = express();

app.use(bodyParser.json());
//app.use(express.json())

//config mongodb
 mongoose.connect(config.mongoURL).then(()=>{
  console.log('connected to db')
},(err) => {console.log(err)}
)
app.use(passport.initialize());

app.use('/users',userRouter)
app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)

const server = http.createServer(app);
server.listen(3000,'localhost')
