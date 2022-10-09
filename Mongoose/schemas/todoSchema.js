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

  
},{
  // Assign a function to the "methods" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the instance functions.
  methods: {
    findActive() {
      return mongoose.model('Todo').find({ status: 'inactive' });
    }
  },
  statics: {
    findByName(name) {
      return this.find({ status: new RegExp(name, 'i') });
    }
  },
  query:{
    byName(name){
      return this.where({ status: new RegExp(name, 'i') })
    }
  }
});



// todoSchema.methods = {
//   findActive: function (){
//     return mongoose.model("Todo").find({status: 'inactive'});
//   }
// }
module.exports = todoSchema;