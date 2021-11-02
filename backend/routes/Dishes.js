const router = require("express").Router();
var kafka = require('../kafka/client');


router.post("/restaurant/dishes", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.add.dish',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/restaurant/:id/dishes", async (req, res)=> {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.restaurantDishes',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

router.get("/restaurant/:id/dishes/:dishId", async (req, res)=> {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
    
    kafka.make_request('ubereats.get.restaurantdish',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

//dishes
router.get("/dishes", async (req, res)=> {
   
    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.get.alldishes',request, function(error,results){
        if (error){
            res.status(400).send(error)
        }else{
            res.status(200).send(results);
        }
    });
});

module.exports = router;
