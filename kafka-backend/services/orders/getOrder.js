const Orders = require("../../model/Orders");

async function handle_request(req, callback){  
    
    const orderId = req.params.id;
    const order = await Orders.findOne({OrderId:orderId});
    callback(null,order);
}

exports.handle_request = handle_request;
