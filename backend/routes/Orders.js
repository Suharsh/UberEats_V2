
const router = require("express").Router();
var kafka = require('../kafka/client');

router.post("/orders/customer/:id", async  (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.create.customerOder',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/orders/customer/:id", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.customerOders',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/orders/restaurant/:id", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.restaurantOrders',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.post("/orders/:id/status", async (req, res)=> {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.update.OrderStatus',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/orders/:id", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.Oder',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/orders/:id/items", async (req, res)=> {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.OderItems',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

module.exports = router;