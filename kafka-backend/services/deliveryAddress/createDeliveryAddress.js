const Customers = require("../../model/Customers");

async function handle_request(req, callback){  
   
    let payload = {
        AddressLine1: req.body.AddressLine1,
        AddressLine2: req.body.AddressLine2,
        City: req.body.City,
        Country: req.body.Country,
        State: req.body.State,
        Pincode: req.body.Pincode,
        AddressName: req.body.AddressName,
    }
    const customerId = req.params.id;
    let customer = await Customers.findOne({CustomerId:customerId});
    if (!customer) {
        error = {message: "Customer not found"};
        return callback(error,null);
    }
    let address = customer.Address.toObject().filter(addr => addr.AddressName === payload.AddressName);
    if(address.length){
        return callback(error,null);
    }
    customer.Address.push(payload);
    let updatedCustomer = await customer.save();
    address = updatedCustomer.Address.toObject().filter(addr => addr.AddressName == payload.AddressName);
    return callback(null,address);
}

exports.handle_request = handle_request;