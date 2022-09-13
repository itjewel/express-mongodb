var express = require('express')
var app = express()
app.use(express.json());

app.param('id', function (req, res, next, id) {
   const user = {
    userid: id
   }
   req.userDtails = user;
    next()
  })
app.get('/user/:id', (req,res)=>{
    console.log(req.userDtails)
    res.send("welcome tho home page");
})

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})