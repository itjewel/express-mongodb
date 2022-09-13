var express = require('express')
var app = express()
app.use(express.json());
app.set('title', 'My Site')

app.get('/', (req,res)=>{
    console.log(app.get('title'))
    res.send("welcome tho home page");
})

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})