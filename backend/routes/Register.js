const router = require("express").Router();
const { v4: uuidv4 } = require('uuid')
const bcrypt = require("bcrypt");
var kafka = require('../kafka/client');
const jwt = require("jsonwebtoken");
const secret = "CMPE273UBEREATS";




router.post("/customer/register", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
   
    kafka.make_request('ubereats.post.customer',request, async (error,results) => {
        if (error){
            res.status(400).send(error)
        }else{
            const payload = { CustomerId : results.CustomerId, EmailId: results.EmailId };
            console.log(payload);
            const token = await jwt.sign(payload, secret, {
                    expiresIn: 1000000,
            });
            res.setHeader('token', "jwt " + token);
            res.status(200).send(results);
        }
    });
});

router.post("/restaurant/register", (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }
   
    kafka.make_request('ubereats.post.restaurant',request, async (error,results)=>{
        if (error){
            res.status(400).send(error)
        }else{
            const payload = { CustomerId : results.RestaurantId, EmailId: results.EmailId };
            const token = await jwt.sign(payload, secret, {
                    expiresIn: 1000000,
            });
            res.setHeader('token', "jwt " + token);
            res.status(200).send(results);
        }
    });
});



module.exports = router;
