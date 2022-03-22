const db = require('../data/database');
const mongodb = require('mongodb');


class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  // save todo
  save() {

    if(this.id) { //if user wants to update existing todo, if this.id is truthy, means that it exists 
        const todoId = new mongodb.ObjectId(this.id)
        return db.getDb().collection('todo').updateOne({_id: todoId}, {$set: {text: this.text}}); 
    } else { //save text as a new entry if it doesn't exists
       return db.getDb().collection('todo').insertOne({text: this.text});
    }
  }

  
  // delete todo
  delete() {
    if (!this.id) { //if user tries to delete todo that doesn't exists in database.  
        throw new Error('Trying to delete todo without id!');
      } 
        const todoId = new mongodb.ObjectId(this.id);
        return db.getDb().collection('todo').deleteOne({ _id: todoId });
  }


  // get  all todos
  static async getTodos() {
      const todos =  await db.getDb().collection('todo').find().toArray();

      return todos.map(todo => {
          return new Todo(todo.text, todo._id);
      })
  }

}

module.exports = Todo