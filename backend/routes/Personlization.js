const router = require("express").Router();
const { checkAuth } = require("../utils/passport");
var kafka = require('../kafka/client');



router.post("/personalize/customer", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
  
    kafka.make_request('ubereats.create.personalization',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/personalize/customer/:id", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.get.personalization',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });})

module.exports = router;