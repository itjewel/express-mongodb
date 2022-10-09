var express = require('express')
var cookieParser = require('cookie-parser')
const fs = require('fs');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const todoHandler = require('./Mongoose/routeHandler/todoHandler');
const userHandler = require('./Mongoose/routeHandler/userHandler');

app.use(cookieParser())
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todos');
}

app.use('/todo',todoHandler);
app.use('/user',userHandler);

const errorHandler  = (err, req, res, next) => {
  if(res.headersSent){
   return next(err)
  }
  res.status(500).json({error:err})
  // res.render('error', { error: err })
} 

app.use(errorHandler);


app.listen(3001, ()=>{
    console.log("listening on port 3001")
})