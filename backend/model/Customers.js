const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
        AddressId: { type: String, auto:true },
        AddressName: { type: String,required: true },
        AddressLine1: { type: String,required: true },
        AddressLine2: { type: String},
        City: { type: String,required: true },
        State: { type: String,required: true },
        Pincode: { type: String,required: true },
        Country: { type: String,required: true }
});

const customerSchema = new Schema({
        CustomerId: { type: mongoose.Types.ObjectId, auto: true },
        EmailId: { type: String, required: true },
        CustomerName: { type: String, required: true },
        CustomerPassword: { type: String, required: true },
        DateOfBirth: { type: String },
        PhoneNumber: { type: String },
        NickName: { type: String },
        Country: { type: String },
        City: { type: String },
        ImageUrl: { type: String },
        Pincode: { type: String },
        State: { type: String },
        Favourites: [mongoose.Types.ObjectId],
        Address: [Address]
    },
    {
        versionKey: false
    });

const Customers = mongoose.model('customers', customerSchema);
module.exports = Customers;