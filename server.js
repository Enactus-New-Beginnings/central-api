const express = require('express')
const app = express()
const port = 8000
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,          
   optionSuccessStatus:200,
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newbeginnings-7fed9-default-rtdb.firebaseio.com"
});

const resourceRoute = require('./routes/resources')
const usersRoute = require('./routes/users')

app.use(cors(corsOptions))
app.use(express.json())
app.use('/auth', usersRoute)
app.use('/resources', resourceRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})