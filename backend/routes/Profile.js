const router = require("express").Router();
const { checkAuth } = require("../utils/passport");
var kafka = require('../kafka/client');


router.post("/restaurant/:id", checkAuth, async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.update.restaurantProfile',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/restaurant/:id", checkAuth, async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.restaurantProfile',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/customer/:id", checkAuth, async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.customerProfile',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});


router.post("/customer/:id", checkAuth, async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.update.customerProfile',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});


module.exports = router;