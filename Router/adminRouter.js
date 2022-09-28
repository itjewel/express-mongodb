const express = require('express')
const adminRouter = express.Router();
adminRouter.get('/dashboard',(req,res)=>{
    res.send("dashboard page");
})

adminRouter.get('/login',(req,res)=>{
    res.send('Login page');
})

module.exports = adminRouter;