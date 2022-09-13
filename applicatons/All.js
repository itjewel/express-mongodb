var express = require('express')
var app = express()
app.use(express.json());

app.all('/', (req,res)=>{
    console.log(app.mountpath)
    res.send("welcome tho home page");
})

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})