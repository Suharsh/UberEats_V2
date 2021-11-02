const Orders = require("../../model/Orders");

async function handle_request(req, callback){  
    
    const customerId = req.params.id;
    const order = await Orders.find({CustomerId:customerId});
    callback(null,order);
}

exports.handle_request = handle_request;
