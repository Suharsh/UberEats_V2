const Restaurants = require("../../model/Restaurants");

async function handle_request(req, callback){  

    let restaurant = await Restaurants.findOne({ RestaurantId: req.params.id });
    callback(restaurant.Dishes.id(req.params.dishId));

    const restaurants = await Restaurants.find();
    let dishes = [];
    restaurants.map(restaurant => dishes.push(...restaurant.Dishes));
    callback(null,dishes);
}

exports.handle_request = handle_request;