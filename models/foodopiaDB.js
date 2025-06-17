const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: process.env.MYSQL_PASSWORD,
    multipleStatements:true,
    database: process.env.DB_NAME,
}) 

db.connect((err)=>{
    if(err) throw err;
    console.log("foodopia db connected.\n")
})

module.exports = {
    db,
}