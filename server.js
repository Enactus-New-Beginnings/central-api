const express = require('express')
const app = express()
const port = 3000

const resourceRoute = require('./routes/resources')

app.use('/resources', resourceRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})