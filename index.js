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
  console.log("Hello World!");
  res.send("<h1>ToDo backend!</h1>");
})

const getAllTodos = async () => {
  const todos = await db.getData("/");
  // console.log(todos);
  return todos;
}

app.post("/addtodo", async (req, res) => {
  console.log("Add todos")
  await db.push(
    "/",
    {
      todos: req.body,
    }, false);
    res.send("Todo added");
  })



  app.post("/gettodos", async (req, res) => {
    console.log("Getting all todos")
    const {todos} = await getAllTodos();
    console.log(todos);
  res.send(todos);
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
})


