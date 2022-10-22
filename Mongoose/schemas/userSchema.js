const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  name: {
    type:String,
    require: true,
  },
  username: {
    type:String,
    require: true,
  },
  password: {
    type:String,
    require: true,
  },
  date: { type: Date, default: Date.now },
  todos: [{
    type:mongoose.Types.ObjectId,
    ref:'Todo'
  }],

  
});

module.exports = userSchema;