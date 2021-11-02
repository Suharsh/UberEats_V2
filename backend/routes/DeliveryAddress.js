
const router = require("express").Router();
var kafka = require('../kafka/client');

router.post("/deliveryAddress/customer/:id", async (req, res)=> {
   
    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.create.deliveryAddress',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/deliveryAddress/customer/:id", async (req, res) => {
    
    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.get.deliveryAddress',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

module.exports = router;