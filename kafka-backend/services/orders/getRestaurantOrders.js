const Orders = require("../../model/Orders");

async function handle_request(req, callback){  
    
    const restaurantId = req.params.id;
    const orders = await Orders.find({RestaurantId:restaurantId});
    callback(null,orders);
}

exports.handle_request = handle_request;
