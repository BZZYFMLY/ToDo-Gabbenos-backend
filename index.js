import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {JsonDB, Config} from "node-json-db";


const db = new JsonDB(new Config("./db/tododb.json", true, false, "/"));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>ToDo backend!</h1>");
})

const getAllTodos = async () => {
  const todos = await db.getData("/");
  // console.log(todos);
  return todos;
}

app.post("/addtodo", async (req, res) => {
  await db.push(
    "/",
    {
      todos: req.body,
    }, false);
  res.send("Todo added");
})



app.post("/gettodos", async (req, res) => {
  const {todos} = await getAllTodos();
  console.log(todos);
  res.send(todos);
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
})


