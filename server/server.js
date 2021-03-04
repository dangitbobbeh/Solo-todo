const express = require("express") // our express server
const path = require('path')
const app = express() // generate an app object
const fs = require('fs')
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000
const todoModel = require('../models/index.js')

app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/list', (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../db.json"))
  todoModel.find({})
  .then(data => res.send(data))
})

app.post('/list', (req, res) => {
  // const newItem = new todoModel(req.body)
    todoModel.create(req.body, (err, results) =>{
      if(err){
        res.status(400).send('Error adding item. This is already on your list!');
      }else{
        res.send(results);
      }
    });
  })


  // fs.readFile(path.join(__dirname, "../db.json"), function (err, data) {
  //   let json = JSON.parse(data)
  //   json.push(req.body)
  //   fs.writeFile(path.join(__dirname, "../db.json"), JSON.stringify(json), (err)=>console.log("saved!"))
  //   return res.end()

app.put('/list/', async (req,res) => {
  // console.log(req.body._id)
  const doc = await todoModel.findOneAndUpdate({_id: req.body._id},
    {completed:true}, {new:true})
  .then((data) => console.log("found data", data))
  res.status(200).send(req.body + "complete!")

})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../front-end/src/index.html')));







// function success(res, payload) {
//   return res.status(200).json(payload)
// }

// app.get("/todos", async (req, res, next) => {
//   try {
//     const todos = await db.Todo.find({})
//     return success(res, todos)
//   } catch (err) {
//     next({ status: 400, message: "failed to get todos" })
//   }
// })

// app.post("/todos", async (req, res, next) => {
//   try {
//     const todo = await db.Todo.create(req.body)
//     return success(res, todo)
//   } catch (err) {
//     next({ status: 400, message: "failed to create todo" })
//   }
// })

// app.put("/todos/:id", async (req, res, next) => {
//   try {
//     const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
//     return success(res, todo)
//   } catch (err) {
//     next({ status: 400, message: "failed to update todo" })
//   }
// })
// app.delete("/todos/:id", async (req, res, next) => {
//   try {
//     await db.Todo.findByIdAndRemove(req.params.id)
//     return success(res, "todo deleted!")
//   } catch (err) {
//     next({ status: 400, message: "failed to delete todo" })
//   }
// })

// app.use("*", (req, res) => res.sendStatus(404))

// app.use((err, req, res, next) => {
//   return res.status(err.status || 400).json({
//     status: err.status || 400,
//     message: err.message || "there was an error processing request",
//   })
// })

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
})