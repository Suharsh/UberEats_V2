mysql = require('mysql');
var db;

function dbConnectionProvider() {
    if (!db) {
        db = mysql.createPool({
            connectionLimit: 10,
            host: "ubereats.c7sbxz8m63pv.us-east-2.rds.amazonaws.com",
            user: "admin",
            password: "admin1234",
            database:"uber-eats"
        });
    }
    return db;

}
module.exports = dbConnectionProvider();


