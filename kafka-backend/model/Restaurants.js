const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
        RestaurantId: { type: mongoose.Types.ObjectId},
        DishName: { type: String, required: true },
        DishDesc: { type: String, required: true },
        Category: { type: String, required: true },
        DishType: { type: String, required: true },
        Price: { type: Number, required: true },
        ImageUrl: { type: String, required: true }
});

const restaurantSchema = new Schema({
        RestaurantId: { type: mongoose.Types.ObjectId, auto: true },
        EmailId: { type: String, required: true },
        RestaurantName: { type: String, required: true },
        RestaurantPassword: { type: String, required: true },
        RestaurantDesc: { type: String },
        PhoneNumber: { type: String },
        Mode: { type: String },
        Country: { type: String, required: true },
        State: { type: String },
        City: { type: String, required: true },
        Pincode: { type: String },
        ImageUrl: { type: String },
        WorkHrsFrom: { type: String },
        WorkHrsTo: { type: String },
        Dishes: [dishSchema]
    },
    {
        versionKey: false
    });

const Restaurants = mongoose.model('restaurants', restaurantSchema);
module.exports = Restaurants;