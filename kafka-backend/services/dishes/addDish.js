const Restaurants = require("../../model/Restaurants");
const mongoose = require('mongoose');

async function handle_request(req, callback){  

    let {DishId,RestaurantId} = req.body;
    let payload = {
        RestaurantId: req.body.RestaurantId,
        DishName: req.body.DishName,
        DishType: req.body.DishType,
        DishDesc: req.body.DishDesc,
        Category: req.body.Category,
        Price: req.body.Price,
        ImageUrl: req.body.ImageUrl
    }
    let restaurant = await Restaurants.findOne({ RestaurantId: RestaurantId });
    if(!restaurant){
        error = {"message": "Restaurant not found"};
        callback(error,null);
    }
    if (!DishId) {
        payload.RestaurantId = RestaurantId;
        restaurant.Dishes.push(payload);
        let response = await restaurant.save();
        updatedRestaurant = response.toObject();
        delete updatedRestaurant.RestaurantPassword;
        callback(null,updatedRestaurant);
    }else{
        let dish = restaurant.Dishes.id(mongoose.Types.ObjectId(DishId));
        dish.set({...payload});
        let response = await restaurant.save();
        updatedRestaurant = response.toObject();
        delete updatedRestaurant.RestaurantPassword;
        callback(null,updatedRestaurant);
    }
}

exports.handle_request = handle_request;