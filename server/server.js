const express = require("express") // our express server
const path = require('path')
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000
// const db = require("./models")

app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload

app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../front-end/src/index.html')));
app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
})