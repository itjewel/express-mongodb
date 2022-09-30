var express = require('express')
var cookieParser = require('cookie-parser')
const fs = require('fs');
const app = express();
app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.json());

app.get('/', [
  (req, res, next)=>{
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals.data = data
      next(err)
    })
  },
  (req, res)=>{
    res.locals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])

app.use((req, res, next) => {
  next('Request url not found!');
})
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }else{

    if(err.message){
      res.status(500).send(err.message);
    }else{
      res.status(500).send('this is error');
    }
  }
  })





app.listen(3001, ()=>{
    console.log("listening on port 3001")
})