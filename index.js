var express = require('express')
var cookieParser = require('cookie-parser')
const adminRouter = require('./Router/adminRouter')
const publicRouter = require('./Router/publicRouter')
const app = express();
app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.json());

app.use('/',publicRouter)

app.use('/admin',adminRouter)

app.listen(3001, ()=>{
    console.log("listening on port 3001")
})