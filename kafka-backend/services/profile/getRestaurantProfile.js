const Restaurants = require("../../model/Restaurants");

async function handle_request(req, callback){
    const id = req.params.id;
    const restaurant = await Restaurants.findOne({RestaurantId:id});
    callback(null,restaurant);
}

exports.handle_request = handle_request;