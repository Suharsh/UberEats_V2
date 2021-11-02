const router = require("express").Router();
var kafka = require('../kafka/client');


// query restaurants based on country and city
// router.get("/restaurant",async(req,res)=>{
//     const query = {};
//     const country = req.query.country;
//     const city = req.query.city;
//     console.log(req.query);
//     if(country!=undefined && country.length)
//       query.Country = country;
//     if(city!=undefined && city.length)
//       query.City = city;
//     const restaurants = await Restaurants.find(query);
//     res.status(200).send(restaurants);
// });

//retrieve all restaurants
router.get("/restaurants",async (req,res) => {
  
  const request = {
    query: req.query, params: req.params, body: req.body,
  }
  
  kafka.make_request('ubereats.get.allrestaurants',request, function(error,results){
    if (error){
        res.status(400).send(error)
    }else{
        res.status(200).send(results);
    }
  });
});

//retrieve a restaurants
router.get("/restaurants/:id",async (req,res) => {

  const request = {
    query: req.query, params: req.params, body: req.body,
  }
 
  kafka.make_request('ubereats.get.restaurant',request, function(error,results){
    if (error){
        res.status(400).send(error)
    }else{
        res.status(200).send(results);
    }
  });
});

module.exports = router;
