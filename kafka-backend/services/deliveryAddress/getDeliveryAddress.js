const Customers = require("../../model/Customers");

async function handle_request(req, callback){  
    
    const customerId = req.params.id;
    let customer = await Customers.findOne({CustomerId:customerId});
    if (!customer) {
        error = {message:"Customer not found"};
        callback(error,null);
    }
    const deliveryAddress = customer.Address || [];
    if (deliveryAddress) {
        callback(null,deliveryAddress);
    }
}

exports.handle_request = handle_request;