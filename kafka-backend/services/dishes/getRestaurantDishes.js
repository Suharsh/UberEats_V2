const Restaurants = require("../../model/Restaurants");

async function handle_request(req, callback){  

    let restaurant = await Restaurants.findOne({ RestaurantId: req.params.id });
    callback(null,restaurant.Dishes);
}

exports.handle_request = handle_request;