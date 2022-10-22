const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const checkLogin = require('../../middleware/checkLogin');
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema)
const User = new mongoose.model('User', userSchema)

router.get('/',checkLogin, async (req,res) => {
    console.log(req)
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

router.get('/populate',checkLogin, async (req,res) => {
    try {
        
        const result  = await Todo.find({}).populate('user','name username');
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json({
            error: "no data get"
        })
        
    }
    

   
});

router.get('/instance',  async (req,res) => {
    const todo = new Todo();

    // Now we can call the function
    // the `this` in the function referes to `dog`
    const result = await todo.findActive();
    // Will put out "dog"

    // const todo = new Todo();
    // const data =  todo.findActive();
     res.status(200).json({
        data: result
    })

   
});

router.get('/static',  async (req,res) => {
    let result = await Todo.findByName('inactive');
     res.status(200).json({
        data: result
    })

   
});

router.get('/query',  async (req,res) => {
    const result = await Todo.find().byName('inactive');
     res.status(200).json({
        data: result
    })

   
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

router.post('/',checkLogin, async (req,res, next) => {
    const newTodo = new Todo({...req.body, user:req.userId});
    try {
     const result =  await newTodo.save();
    //  await User.updateOne({_id:req.userId}, {
    //     $push: {
    //         todos: result._id,
    //     }
    //  })
     const update = { $push: { todos: result._id }};
     const updteResult = await User.updateOne({_id:req.userId}, update);
    //  console.log(updteResult)

     res.status(200).json({
        message: updteResult
    })
     
    } catch (error) {
        res.status(500).json({
            error: 'There was a serverside error'
        })
    }
    
});

router.post('/all',checkLogin, async (req,res) => {
    const newTodo = req.body;
    // const reducer = req.body.reduce((pre, current)=>{
    //     return {...pre,user:req.userId}
 
    //  })
    //   console.log(reducer)


    const result = req.body.map((obj)=>{
       return {...obj,user:req.userId}

    })
    //  console.log(result)
    
    await Todo.insertMany(result,(err) =>{
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