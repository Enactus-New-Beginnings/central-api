const router = require('express').Router()
const admin = require("firebase-admin");
const auth=admin.auth()
const db=admin.database()

router.post('/signup', async (req, res) => {
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        db.ref("users/"+user.uid).set({
            email: user.email
        })
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        res.status(400).json(errorMessage)
    });
})

module.exports = router
