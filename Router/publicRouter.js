const express = require('express')
const publicRouter = express.Router();

const log = (req, res, next)=>{
    console.log("i am middle ware");
    next();
  }
publicRouter.all('*', log)

publicRouter.route('/user/:id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(function (req, res, next) {
    res.send(`jewel ${req.params.id}`)
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })


publicRouter.get('/about',(req,res)=>{
    res.send('about page');
})

module.exports = publicRouter;