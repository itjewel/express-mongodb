const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
  title: {
    type:String,
    require: true,
  },
  description:{
    type:String,
  },
  status:{
    type:String,
    enum: ['active', 'inactive'],
  },
  date: { type: Date, default: Date.now },
});

module.exports = todoSchema;