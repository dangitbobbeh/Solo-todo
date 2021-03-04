const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://DavidB:DavidB@todo.gkvfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Todo'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  // creating a schema for todo
  task: {
    // field1: task
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  completed: {
    // field2: completed
    type: Boolean, // it is a boolean
    default: false, // the default is false
  },
})

const todoModel = mongoose.model("Todo", todoSchema) // creating the model from the schema

module.exports = todoModel // exporting the model
