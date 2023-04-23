import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {JsonDB, Config} from "node-json-db";

const db = new JsonDB(new Config("./db/tododb.json", true, false, "/"));

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
  res.send(
    `<h1>ToDo backend!</h1>
    <p>Valid endpoint os the api are:</p>
      <ul>
        <li>/gettodos GET request</li>
        <li>/addtodo POST request request body with following format: {id, content, date, done}</li>
      </ul>`
  );
});

const getAllTodos = async () => {
  let todos = [];
  let msg;
  try {
    todos = await db.getData("/todos");
    msg = "ok";
  } catch (error) {
    msg = "error";
    res.status(500).send({msg: "Error getting todos"});
  }
  return todos;
};

const validateTodo = (todo) => {
  if (todo.content === undefined || todo.content === "") {
    return false;
  }
  if (todo.date === undefined || todo.date === "") {
    return false;
  } else {
    const date = new Date(todo.date);
    if (date === "Invalid Date") {
      return false;
    }
  }
  if (todo.done === undefined || todo.priority === "") {
    return false;
  } else {
    if (typeof todo.done !== "boolean") {
      return false;
    }
  }
  if (todo.id === undefined || todo.dueDate === "") {
    return false;
  }
  return true;
};

const addTodo = async (todo) => {
  await db.push("/todos", [todo], false);
};

app.post("/addtodo", async (req, res) => {
  const newTodo = req.body;

  // if (!validateTodo(newTodo)) {
  //   res.status(400).send({msg: "Invalid todo"});
  //   return;
  // }

  addTodo(newTodo);

  const newTodos = await getAllTodos();

  res.status(200).send(newTodos);
});

app.get("/gettodos", async (req, res) => {
  const todos = await getAllTodos();
  res.status(200).send(todos);
});

app.post("/deletetodo", async (req, res) => {
  const {id} = req.body;
  console.log(id);
  const todos = await getAllTodos();

  const newTodos = todos.filter((todo) => todo.id !== id);
  console.log(newTodos);

  await db.push("/todos", newTodos, true);

  res.status(200).send(newTodos);
});

app.listen(8080, () => {});


