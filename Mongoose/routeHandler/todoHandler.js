const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('todo', todoSchema)

router.get('/', async (req,res) => {
    // try {
    //   const resData =   await Todo.find({'status': 'active'});
    //     res.status(200).json({
    //         message: resData
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         error: "no data get"
    //     })
    // }

     Todo.find({}, function (err, data) {
        if(err){
            res.status(500).json({
                error: "no data get"
            });
        }else{
            res.status(200).json({
                result: data,
                message: 'success'
            })
        }
    });

//    await Todo.find({status:'active'}, function (err, docs) {
//     if(err){
//         console.log(err)
//     }else{
//         console.log(docs)
//     }
//    });
   
});

router.get('/:id', async (req,res) => {
    try {
        const resData =   await Todo.find({_id: req.params.id});
          res.status(200).json({
              message: resData
          })
      } catch (error) {
          res.status(500).json({
              error: "no data get"
          })
      }
});

router.post('/', async (req,res, next) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error: 'There was a serverside error'
            })
        }else{
            res.status(200).json({
                message: 'Todo was inserted successfully!'
            })
        }
    });
});

router.post('/all', async (req,res) => {
    await Todo.insertMany(req.body,(err) =>{
        if(err){
            res.status(500).json({
                error: 'There was a serverside error'
            })
        }else{
            res.status(200).json({
                message: 'Todo was inserted successfully!'
            })
        }
    });
});

router.put('/:id', async (req,res) => {
    try {
      await Todo.updateOne({ _id: req.params.id }, { title: req.body.title }); 
        res.status(200).json({
            message: 'success'
        })       
    } catch (error) {
        res.status(500).json({
            error: 'There was a serverside error'
        })
    }
});

router.delete('/:id', async (req,res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id }); 
          res.status(200).json({
              message: 'success'
          })       
      } catch (error) {
          res.status(500).json({
              error: 'There was a serverside error'
          })
      }
});







module.exports = router;