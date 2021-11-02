const Restaurants = require("../../model/Restaurants");

async function handle_request(msg, callback){
    const restaurants = await Restaurants.find();
    callback(null,restaurants);
}

exports.handle_request = handle_request;