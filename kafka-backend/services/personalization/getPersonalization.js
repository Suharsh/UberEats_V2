const mongoose = require('mongoose');
const Customers = require("../../model/Customers");
const Restaurants = require("../../model/Restaurants");



async function handle_request(req, callback){  
   
    const CustomerId = mongoose.Types.ObjectId(req.params.id);
    let customer = await Customers.findOne({ CustomerId: CustomerId });
    if (!customer) {
        error = {message: "Customer not found"};
        callback(error,null);
    }
    const restaurantIds = customer.Favourites.toObject();
    const favourites = await Restaurants.find({RestaurantId: {$in: restaurantIds}});
    callback(null,favourites);
}

exports.handle_request = handle_request;
