const Orders = require("../../model/Orders");

async function handle_request(req, callback){  
   
    let currentTimeStamp = new Date();
    let cart = req.body.Cart;
    let orderDetails = [];

    cart.map(
        item => {
            orderDetails.push({
                DishName: item.DishName,
                DishDesc: item.DishDesc,
                Quantity: item.Quantity,
                Price: item.Price
            });
        }
    );

    let orderPayload = {
        CustomerId: req.params.id,
        CustomerName: req.body.CustomerName,
        ImageUrl: req.body.ImageUrl,
        RestaurantId: req.body.RestaurantId,
        OrderStatus: "Order Recieved",
        DeliveryType: req.body.DeliveryType,
        CreatedAt: currentTimeStamp,
        LastUpdatedTime: currentTimeStamp,
        DeliveryAddress: req.body.DeliveryAddress,
        OrderDetails: orderDetails
    }
    const order = new Orders({...orderPayload}); 
    const savedOrder = await order.save()
    callback(null,savedOrder);
}

exports.handle_request = handle_request;
