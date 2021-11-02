const Customers  = require("../../model/Customers");
const bcrypt = require("bcrypt");

async function handle_request(req, callback){  

    const EmailId = req.body.EmailId;
    const CustomerPassword = req.body.CustomerPassword;

    let customer = await Customers.findOne({ EmailId: EmailId });
    if (!customer) {
        error = { message: "Customer not found" }
        callback(error,null);
    }
    const isValid = await bcrypt.compare(
        CustomerPassword,
        customer.CustomerPassword
    );
    if (isValid) {
        let customerObject = customer.toObject();
        delete customerObject.CustomerPassword;
        callback(null,customerObject);
    } else {
        error = { message: "Invalid user name or password" };
        callback(error,null);
    }
}

exports.handle_request = handle_request;