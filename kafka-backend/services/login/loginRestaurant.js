const Restaurants = require("../../model/Restaurants");
const bcrypt = require("bcrypt");

async function handle_request(req, callback){  

    const EmailId = req.body.EmailId;
    const RestaurantPassword = req.body.RestaurantPassword;

    let restaurant = await Restaurants.findOne({ EmailId: EmailId });
    if (!restaurant) {
        error = { message: "Restaurant not found" };
        callback(error,null);
    }
    const isValid = await bcrypt.compare(
        RestaurantPassword,
        restaurant.RestaurantPassword
    );
    if (isValid) {
        let restaurantObject = restaurant.toObject();
        delete restaurantObject.CustomerPassword;
        callback(null,restaurantObject);
    } else {
        error = {message : "Invalid credentials"};
        callback(error,null);
    }
}

exports.handle_request = handle_request;