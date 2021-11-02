var bcrypt = require('bcrypt');
const Customers = require("../../model/Customers");


async function handle_request(req, callback){

    const customerId = req.params.id;
    let customer = await Customers.findOne({CustomerId:customerId});
    if (!customer) {
        error = {message: "Customer not found"};
        callback(error,null);
    }

    payload = {
        CustomerName:req.body.RestaurantName,
        NickName: req.body.NickName ,
        PhoneNumber:req.body.PhoneNumber ,
        DateOfBirth: req.body.DateOfBirth,
        Country: req.body.Country,
        State: req.body.State,
        City: req.body.City,
        Pincode: req.body.Pincode,
        ImageUrl: req.body.ImageUrl
    }

    Customers.findOneAndUpdate({ CustomerId: customerId }, payload,{returnNewDocument:true}, function (err, updatedCustomer) {
        if (err){
            callback(err,null);
        } 
        callback(null,updatedCustomer);
    });
}

exports.handle_request = handle_request;