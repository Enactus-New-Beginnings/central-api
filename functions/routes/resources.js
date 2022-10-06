const router = require("express").Router();
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const db=admin.database();

router.get("/all", async(req,res)=>{
  const resources = ["clothing", "food", "housing"]
  const promises = [];
  resources.forEach((resource)=>{
    promises.push(db.ref().child("resources").child(resource).get().then((snapshot) => {
      return snapshot.val();
    }).catch(() => {
        return
    }))
  });
});

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

router.post("/:key/:resourceNames", async(req, res)=>{
  const resourceNames = req.params.resourceNames.split(",");
  const promises=[]
  db.ref().child("key").get().then((key)=>{
    if(req.params.key===key.val()){
      resourceNames.forEach(resourceName=>{
        const resourceLink="https://opensheet.elk.sh/1YCuqvWiWK6ENuXnSFEZU1bpk1HDdWGqP0D_cCm8GSFk/"+resourceName
        promises.push(
          fetch(resourceLink)
            .then((res)=>{
              return res.json();
            })
              .then(data=>{
                if(data){
                  return db.ref().child("resources").child(resourceName).set(data).then(()=>{
                    return data;
                  })
                } else{
                  throw new Error("resource not found");
                }
              })
        );
      });
      Promise.all(promises).then(
        (data)=>{
          return res.status(200).json(data);
        }
      ).catch((err)=>{
        return res.status(500).json(err.message);
      });
    } else{
      res.status(500).json("not authenticated");
    }
  })
})

module.exports = router;
