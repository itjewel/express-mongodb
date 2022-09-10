var express = require('express')
var app = express()
const router = express.Router();
app.use(router);
app.use(express.json());

router.get('/', (req, res)=>{
    res.send("this is a home page");
})
router.post('/', (req, res)=>{
    console.log(req.body)
    res.send("this is a post request page");
})

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})