var express = require('express')
var app = express()
var admin = express();
app.use(express.json());

app.get('/', (req,res)=>{
    console.log(app.mountpath)
    res.send("welcome tho home page");
})
admin.get('/hello', (req,res)=>{
    console.log(admin.mountpath)
    res.send("welcome tho dashboard page");
})


app.use('/admin', admin)

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})