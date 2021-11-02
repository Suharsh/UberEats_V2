const Orders = require("../../model/Orders");

async function handle_request(req, callback){  
   
    const orderId = req.params.id;
    const status = req.body.OrderStatus
    const order = await Orders.findOne({OrderId:orderId});
    order.OrderStatus = status;
    const savedOrder = await order.save();
    callback(null,savedOrder);
}

exports.handle_request = handle_request;
