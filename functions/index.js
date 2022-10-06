const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({origin: true}));

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newbeginnings-7fed9-default-rtdb.firebaseio.com",
});

const resourceRoute = require("./routes/resources");
const usersRoute = require("./routes/users");

app.use(express.json());
app.use("/auth", usersRoute);
app.use("/resources", resourceRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//app.listen(3000)

exports.widgets = functions.https.onRequest(app);
