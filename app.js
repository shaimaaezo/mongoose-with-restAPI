const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const mongoose = require('mongoose')

const dishRouter = require('./routs/dishRouter')
const leaderRouter = require('./routs/leaderRouter')
const promoRouter = require('./routs/promoRouter')

const app = express();
const URL = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(URL )


app.use(bodyParser.json());
//app.use(express.json())

//config mongodb
connect.then((db)=>{
  console.log('*************connected to db*************')
},(err) => {console.log(err)}
)

app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)

const server = http.createServer(app);
server.listen(3000,'localhost')
