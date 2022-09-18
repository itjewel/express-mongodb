var express = require('express')
var cookieParser = require('cookie-parser')
var app = express();
app.set('view engine','ejs')
const adminRoute = express.Router();
app.use(cookieParser())
app.use(express.json());

app.get('/views', (req,res)=>{
  res.render("index",{
    name:'Bangladesh is my favorite country'
  });
})

app.use('/admin', adminRoute);




app.listen(3001, ()=>{
    console.log("listening on port 3001")
})