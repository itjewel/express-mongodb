var express = require('express')
var app = express()
app.set("view engine", 'ejs')
app.use(express.json());

app.get('/', (req, res)=>{
  res.render('index');
})

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})