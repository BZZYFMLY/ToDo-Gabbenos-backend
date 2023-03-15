import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {JsonDB, Config} from "node-json-db";

const db = new JsonDB(new Config("./db/tododb.json", true, false, "/"));

const getTodosEndpoint = "gettodos";
const addTodoEndpoint = "addtodo";
const clearAllTodosEndpoint = "clearalltodos";
const deleteTodoEndpoint = "deletetodo";
const updateTodoEndpoint = "updatetodo";

// allow cors for all origins
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("<h1>ToDo backend!</h1>");
})

const getAllTodos = async () => {
  const todos = await db.getData("/");
  return todos;
}

app.post(`/${addTodoEndpoint}`, async (req, res) => {
  await db.push(
    "/",
    {
      todos: [req.body.data],
    }, false);
    const {todos} = await getAllTodos();
    res.send(todos);
})

app.post(`/${clearAllTodosEndpoint}`, async (req, res) => {
  await db.push(
    "/",
    {
      todos: [],
    },
    false
  );
  res.send("All todos cleared");
});

app.post(`/${deleteTodoEndpoint}`, async (req, res) => {
  const {todos} = await getAllTodos();
  console.log(req.body.data.id)
  console.log(todos.length)
  const newTodos = todos.filter((todo) => todo.id !== req.body.data.id);
  console.log(newTodos.length)
  await db.push(
    "/",
    {
      todos: newTodos,
    },
    true
  );
  res.send(newTodos);
});

app.post(`/${updateTodoEndpoint}`, async (req, res) => {
  const {todos} = await getAllTodos();
  const newTodo = req.body.data;
  console.log(newTodo)

  const newTodos = todos.map((todo) => {
    if (todo.id === newTodo.id) {
      return newTodo;
    }
    return todo;
  });

  await db.push(
    "/",
    {
      todos: newTodos,
    },
    true
  );
  res.send(newTodos);
});

app.post(`/${getTodosEndpoint}`, async (req, res) => {
  const {todos} = await getAllTodos();
  res.send(todos);
})

app.listen(8080, () => {
})


