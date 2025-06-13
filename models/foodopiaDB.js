const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "127west26",
    multipleStatements:true,
    database: "foodopia_nodeJS",
}) 

db.connect((err)=>{
    if(err) throw err;
    console.log("foodopia db connected.\n")
})

module.exports = {
    db,
}