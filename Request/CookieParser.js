var express = require('express')
var cookieParser = require('cookie-parser')
var app = express();
const adminRoute = express.Router();
app.use(cookieParser())
app.use(express.json());

app.post('/',(reqq,ress)=>{
  console.log(reqq.cookies)
  ress.send("This is a root page");
})
app.get('/user/:id', (req,res)=>{
    console.log(req.cookies)
    res.send("welcome tho home page");
})
adminRoute.get('/dashboard',(req,res)=>{
  console.log(req.cookies)
  res.send("this is a admin route");
});
app.use('/admin', adminRoute);