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
  console.log("Hello World!");
  res.send("<h1>ToDo backend!</h1>");
})

const getAllTodos = async () => {
  const todos = await db.getData("/");
  console.log(todos);
  return todos;
}

app.post(`/${addTodoEndpoint}`, async (req, res) => {
  console.log("Add todos")
  console.log("req.body", req.body.data);
  await db.push(
    "/",
    {
      todos: [req.body.data],
    }, false);
    const {todos} = await getAllTodos();
    res.send(todos);
})

app.post(`/${clearAllTodosEndpoint}`, async (req, res) => {
  console.log("Clear all todos");
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
  console.log("Delete todo");
  console.log("req.body", req.body.data);
  const {todos} = await getAllTodos();
  const newTodos = todos.filter((todo) => todo.id !== req.body.data.id);
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
  console.log("Update todo");

  const {todos} = await getAllTodos();
  const newTodos = todos.map((todo) => {
    if (todo.id === req.body.data.id) {
      return req.body.data;
    }
    return todo;
  });
  await db.push(
    "/",
    {
      todos: newTodos,
    },
    false
  );
  res.send("Todo updated");
});

app.post(`/${getTodosEndpoint}`, async (req, res) => {
  console.log("Getting all todos")
  const {todos} = await getAllTodos();
  console.log(todos);
  res.send(todos);
})

app.listen(8080, () => {
  console.log("Server started on port 8080");
})


