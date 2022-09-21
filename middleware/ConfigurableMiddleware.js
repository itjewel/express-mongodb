var express = require('express')
var cookieParser = require('cookie-parser')
var app = express();
app.set('view engine','ejs')
const adminRouter = express.Router();
app.use(cookieParser())
app.use(express.json());

const loggerWrapper = (options) => {
  return function (req, res, next){
  if(options.log){
    console.log(`Admin Logger ${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`)
    next();  
  }else{
    throw new Error('This is an error');
  }   
  }

}
 

// app.use(logger);
// const logger = (req, res, next) => {
//   console.log(`Admin Logger ${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`)
//   // next();
//   throw new Error('This is an error');
// }
adminRouter.use(loggerWrapper({log: false}))


app.post('/',(reqq,ress)=>{
  console.log(reqq.app)
  ress.send("This is a root page");
})
app.get('/user/:id', (req,res)=>{
    console.log(req.get('Accept'))
    res.send("welcome tho home page");
})
app.get('/views', (req,res)=>{
  // see in header option it's set into the header
  res.location('/user/:id')
  res.end();
 
})
adminRouter.get('/dashboard',(req,res)=>{

  res.send("this is a admin route");
});

app.use('/admin', adminRouter);


const errorHandelingMid = ((err, req, res, next) => {
  console.error(err.message)
  res.status(500).send('Something broke!')
})
app.use(errorHandelingMid)


app.listen(3001, ()=>{
    console.log("listening on port 3001")
})