# This is a ToDo app JSONDB Rest API
Tha Api runs on https://todo-gabbenos.fly.dev/

## Endpoints
/ - GET - retunrs wllcome message
/todos - POST - returns all todos
/addtodo - POST - adds a todo to DB
/deletetodo - POST - deletes a todo from DB
/updatetodo - POST - updates a todo from DB

## How to run
1. Clone the repo
2. Run `npm install`
3. Run `npm serve`
4. Open `http://localhost:8080/` in your browser

## How to deploy
1. Clone the repo
2. fly launch --now

(First install the fly.io CLI. pwershell on windows or bash on linux or mac.)[https://fly.io/docs/hands-on/install-flyctl/]
(An sign in CLI and login with `flyctl auth login`)[https://fly.io/docs/hands-on/sign-in/]

