var express = require('express')
var app = express()
app.use(express.json());

app.route('/events')
.get(function (req, res, next) {
    res.send("this is a app get method")
  })
  .post(function (req, res, next) {
    res.send("this is a post method");
  })

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})