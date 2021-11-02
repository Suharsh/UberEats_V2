const Restaurants = require("../../model/Restaurants");

async function handle_request(req, callback){  

    let restaurant = await Restaurants.findOne({ RestaurantId: req.params.id });
    let dish = restaurant.Dishes.id(req.params.dishId)
    callback(null,dish);
}

exports.handle_request = handle_request;