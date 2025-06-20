const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host:"localhost",
    // user:"root",
    user:process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements:true,
    database: "foodopia",
}) 

db.connect((err)=>{
    if(err) throw err;
    console.log("foodopia db connected.\n")
})

module.exports = {
    db,
}