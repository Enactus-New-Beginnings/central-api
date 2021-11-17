const router = require('express').Router()
const admin = require("firebase-admin");
const db=admin.database()

router.get('/:resourceName', async (req, res) => {
    db.ref().child("resources").child(req.params.resourceName).get().then((snapshot) => {
        if (snapshot.exists()) {
            let data=snapshot.val()
          res.status(200).json(data)
        } else {
          res.status(400).json("No data available")
        }
      }).catch((error) => {
          console.log(error)
        res.status(500).json(error)
      });
})

module.exports = router
