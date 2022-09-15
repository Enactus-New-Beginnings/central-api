const router = require("express").Router();
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const db=admin.database();

router.get("/:resourceName", async (req, res) => {
    db.ref().child("resources").child(req.params.resourceName).get().then((snapshot) => {
        if (snapshot.exists()) {
            let data=snapshot.val();
          res.status(200).json(data);
        } else {
          res.status(400).json("No data available");
        }
      }).catch((error) => {
          console.log(error);
        res.status(500).json(error);
      });
});

router.post("/:key/:resourceName", async(req, res)=>{
  db.ref().child("key").get().then((key)=>{
    if(req.params.key===key.val()){
      const resourceLink="https://opensheet.elk.sh/1YCuqvWiWK6ENuXnSFEZU1bpk1HDdWGqP0D_cCm8GSFk/"+req.params.resourceName
      const response = fetch(resourceLink).then((res)=>{
        return res.json()
      }).then(data=>{
        if(data){
          db.ref().child("resources").child(req.params.resourceName).set(data).then(()=>{
            return res.status(200).json(data)
          })
        } else{
          return res.status(500).json("Could not get resource");
        }
      });
    } else{
      res.status(500).json("not authenticated")
    }
  })
})

module.exports = router;
