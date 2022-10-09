const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User', userSchema)

router.post('/signup', async (req,res, next) => {
    try{
        const hasPass = await bcrypt.hash(req.body.password, saltRounds);
        const userdata  = {
            name: req.body.name,
            username: req.body.username,
            password: hasPass,
        }
    const newUser = new User(userdata);
    const resData =  await newUser.save();
    res.status(200).json({
        message: resData
    })
    } catch {
        res.status(500).json({
            error: 'There was a serverside error'
        })
    }
 
});

router.post('/login', async (req,res) => {
    try{
       const findUserData =  await User.find({ username: req.body.username }).exec();
    //    console.log(findUserData[0].username);
    //    return false;
    if(findUserData && findUserData.length > 0){
        const isValidPassword = await bcrypt.compare(req.body.password, findUserData[0].password);
        console.log(process.env.JWT_TOKEN)
        if(isValidPassword){
            const token = jwt.sign({ username: findUserData[0].username,
            userId: findUserData[0]._id}, process.env.JWT_TOKEN);
                 res.status(200).json({
                    "access_token":token,
                    "message": 'login success fully'
                })
        }else{
            res.status(500).json({
                error: 'Authentication failed'
            })
        }
    }else{
        res.status(500).json({
            error: 'Authentication failed'
        })
    }


    } catch {
        res.status(500).json({
            error: 'Authentication failed'
        })
    }
});


module.exports = router;