var express = require('express')
var cookieParser = require('cookie-parser')
const app = express();
app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.json());

app.get("/",(req,res,next)=>{
  for(i=0; i<=10; i++){
    if(i === 5){
      next("nothing to do");
    }else{
      res.write('a');
    }
    // res.write('a');
  }
  res.end();
})

app.use((req, res, next) => {
  // res.status(400).send.('Request url not found!')
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