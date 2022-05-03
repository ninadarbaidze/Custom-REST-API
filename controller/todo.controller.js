const Todo = require('../model/todo.model');

//get all todos
async function getAllTodos(req, res, next) {
    let todos;
    try {
        todos = await Todo.getTodos();
    } catch (error) {
        return next(error);
    }

    res.json({
        todos: todos,
    });
}


// add individual todo
async function addTodo(req, res, next) {
    const todoText = req.body.text;

    //inserting text to my object instance
    const todo = new Todo(todoText);

    let insertedId;
    try {
        const result = await todo.save(); //result is: acknowledged: true, insertedId: new ObjectId
        insertedId = result.insertedId; //inserted id/ids are return in mongodb, after insertOne, or insertMany. insertedId shows new inserted document generated ids. 
    } catch (error) {
        return next(error);
    }

    //inserting id to my object instance
    todo.id = insertedId.toString();

    res.json({ message: 'Added todo!', createdTodo: todo });
}



//update specific todo
async function updateTodo(req, res, next) {
    const todoId = req.params.id; //idea of patch is that we also get specific id in request url: /todos/:id
    const newTodoText = req.body.newText;
  
    const todo = new Todo(newTodoText, todoId);
  
    try {
      await todo.save(); //in todo.model controller there's a logic, if id exists, then that specific todo entry will be updated
    } catch (error) {
      return next(error);
    }
  
    res.json({ message: 'Todo updated', updatedTodo: todo });
}



//Delete specific todos
async function deleteTodo(req, res, next) {
    const todoId = req.params.id;

    const todo = new Todo(null, todoId);
  
    try {
      await todo.delete();
    } catch (error) {
      return next(error);
    }
  
    res.json({ message: 'Todo deleted' });
}

module.exports = {
    getAllTodos: getAllTodos,
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
}
