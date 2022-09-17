var express = require('express')
var app = express();
const adminRoute = express.Router();
app.use(express.json());

// app.get('/user/:id', (req,res)=>{
//     console.log(req.baseUrl)
//     res.send("welcome tho home page");
// })
adminRoute.get('/dashboard',(req,res)=>{
  console.log(req.baseUrl)
  res.send("this is a admin route");
});
app.use('/admin', adminRoute);




app.listen(3001, ()=>{
    console.log("listening on port 3001")
})