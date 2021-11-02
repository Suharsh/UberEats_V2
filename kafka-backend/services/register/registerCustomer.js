var bcrypt = require('bcrypt');
const Customers = require("../../model/Customers");
const jwt = require("jsonwebtoken");
const secret = "CMPE273UBEREATS";


async function handle_request(req, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(req));

    const payload = { ...req.body };
    try {
        let customer = await Customers.findOne({ EmailId: payload.EmailId });
        if (customer) {
            error = {message:"Email Id is already registered"};
            callback(error,null);
        }
        payload.CustomerPassword = await bcrypt.hash(payload.CustomerPassword, 10);
        customer = new Customers({ ...payload});
        const savedCustomer = await customer.save();
        if (savedCustomer) {
            callback(null,savedCustomer);
        }
    } catch (error) {
        callback(error,"Error");
    }
}

exports.handle_request = handle_request;