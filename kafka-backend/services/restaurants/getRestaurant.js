const Restaurants = require("../../model/Restaurants");

async function handle_request(msg, callback){
    const id = msg.params.id;
    const restaurants = await Restaurants.find({RestaurantId:id});
    callback(null,restaurants);
}

exports.handle_request = handle_request;