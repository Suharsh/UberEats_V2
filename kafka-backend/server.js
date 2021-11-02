var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var registerCustomer = require('./services/register/registerCustomer.js');
var registerRestaurant = require('./services/register/registerRestaurant.js');

var loginCustomer = require('./services/login/loginCustomer');
var loginRestaurant = require('./services/login/loginRestaurant');

var getCustomerProfile = require('./services/profile/getCustomerProfile');
var getRestaurantProfile = require('./services/profile/getRestaurantProfile');
var updateCustomerProfile = require('./services/profile/updateCustomerProfile');
var updateRestaurantProfile = require('./services/profile/updateRestaurantProfile');

var getAllRestaurants = require('./services/restaurants/getAllRestaurants');
var getRestaurant = require('./services/restaurants/getRestaurant');

var createPersonalization = require('./services/personalization/createPersonalization');
var getPersonalization = require('./services/personalization/getPersonalization');

var createCustomerOrder = require('./services/orders/createCustomerOrder');
var getCustomerOrders = require('./services/orders/getCustomerOrders');
var getOrder = require('./services/orders/getOrder');
var getOrderItems = require('./services/orders/getOrderItems');
var getRestaurantOrders = require('./services/orders/getRestaurantOrders');
var updateOrderStatus = require('./services/orders/updateOrderStatus');

var addDish = require('./services/dishes/addDish');
var getAllDishes = require('./services/dishes/getAllDishes');
var getRestaurantDish = require('./services/dishes/getRestaurantDish');
var getRestaurantDishes = require('./services/dishes/getRestaurantDishes');

var createDeliveryAddress = require('./services/deliveryAddress/createDeliveryAddress');
var getDeliveryAddress = require('./services/deliveryAddress/getDeliveryAddress');

const mongoose = require('mongoose');
const { mongoDB } = require('./config');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


function handleTopicRequest(topic_name,fname){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("ubereats.post.customer",registerCustomer);
handleTopicRequest("ubereats.post.restaurant",registerRestaurant);

//login
handleTopicRequest("ubereats.login.customer",loginCustomer);
handleTopicRequest("ubereats.login.restaurant",loginRestaurant);

//profile
handleTopicRequest("ubereats.update.customerProfile",updateCustomerProfile);
handleTopicRequest("ubereats.update.restaurantProfile",updateRestaurantProfile);
handleTopicRequest("ubereats.get.customerProfile",getCustomerProfile);
handleTopicRequest("ubereats.get.restaurantProfile",getRestaurantProfile);

//restaurants
handleTopicRequest("ubereats.get.allrestaurants",getAllRestaurants);
handleTopicRequest("ubereats.get.restaurant",getRestaurant);

//personalization
handleTopicRequest("ubereats.create.personalization",createPersonalization);
handleTopicRequest("ubereats.get.personalization",getPersonalization);

//dishes
handleTopicRequest("ubereats.add.dish",addDish);
handleTopicRequest("ubereats.get.alldishes",getAllDishes);
handleTopicRequest("ubereats.get.restaurantdish",getRestaurantDish);
handleTopicRequest("ubereats.get.restaurantDishes",getRestaurantDishes);

//orders
handleTopicRequest("ubereats.create.customerOder",createCustomerOrder);
handleTopicRequest("ubereats.get.customerOders",getCustomerOrders);
handleTopicRequest("ubereats.get.Oder",getOrder);
handleTopicRequest("ubereats.get.OderItems",getOrderItems);
handleTopicRequest("ubereats.get.restaurantOrders",getRestaurantOrders);
handleTopicRequest("ubereats.update.OrderStatus",updateOrderStatus);

//delivery address
handleTopicRequest("ubereats.create.deliveryAddress",createDeliveryAddress);
handleTopicRequest("ubereats.get.deliveryAddress",getDeliveryAddress);


















