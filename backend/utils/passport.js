"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const secret = "CMPE273UBEREATS";
const Customers = require('../model/Customers');
const Restaurants = require('../model/Restaurants');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log(jwt_payload);            
            if("CustomerId" in jwt_payload){
                let CustomerId = jwt_payload.CustomerId;
                Customers.findOne({CustomerId:CustomerId}, (err, results) => {
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            }else if("RestaurantId" in jwt_payload){
                let RestaurantId = jwt_payload.RestaurantId;
                Restaurants.findOne({RestaurantId:RestaurantId}, (err, results) => {
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            }else{
                return callback(null, false);
            }
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


