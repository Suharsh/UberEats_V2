const router = require("express").Router();
var kafka = require('../kafka/client');
const jwt = require("jsonwebtoken");
const secret = "CMPE273UBEREATS";

router.post("/customer/login",  async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.login.customer',request, async (error,results) => {
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

router.post("/restaurant/login", async (req, res) => {

    const request = {
        query: req.query, params: req.params, body: req.body,
    }

    kafka.make_request('ubereats.login.restaurant',request, async (error,results) => {
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



module.exports = router;
