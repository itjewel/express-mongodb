var express = require('express')
var app = express()
// app.use(express.json());
// app.use(express.raw());
// app.use(express.text());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public',{
    index:"home.html"
}))

app.get('/', (req, res)=>{
    res.send("this is a home page");
})
app.post('/', (req, res)=>{
    console.log(req.body)
    res.send("this is a post request page");
})

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})