const Restaurants = require("../../model/Restaurants");

async function handle_request(req, callback){
    
    const customerId = mongoose.Types.ObjectId(req.params.id);
    let customer = await Customers.findOne({CustomerId:customerId});
    if (!customer) {
        error = {message : "Customer not found"};
        return callback(error,null);
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

    Customers.findOneAndUpdate({ CustomerId: customerId }, payload,{returnNewDocument:true}, function (err, updateCustomer) {
        if (err){
            callback(error, null);
        }
        callback(null,results);
    });
}

exports.handle_request = handle_request;