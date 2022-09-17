var express = require('express')
var cookieParser = require('cookie-parser')
var app = express();
const adminRoute = express.Router();
app.use(cookieParser())
app.use(express.json());

app.post('/',(reqq,ress)=>{
  console.log(reqq.app)
  ress.send("This is a root page");
})
app.get('/user/:id', (req,res)=>{
    console.log(req.get('Accept'))
    res.send("welcome tho home page");
})
adminRoute.get('/dashboard',(req,res)=>{
  console.log(req.app)
  res.send("this is a admin route");
});
app.use('/admin', adminRoute);




app.listen(3001, ()=>{
    console.log("listening on port 3001")
})