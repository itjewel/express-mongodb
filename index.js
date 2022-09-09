var express = require('express')
var app = express()
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("this is a home page");
})
app.post('/', (req, res)=>{
    console.log(typeof req.body)
    res.send("this is a post request page");
})

app.listen(3000, ()=>{
    console.log("listening on port 3000")
})