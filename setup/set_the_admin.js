const bcrypt = require('bcrypt');
const { db } = require("../models/foodopiaDB");
require('dotenv').config();

const the_admin = {
  username: "admin",
  name: process.env.ADMIN_NAME,
  password: process.env.ADMIN_PASSWORD
}

async function make_the_admin() {
  const salt_rounds = 10;
  const hashedPassword = await bcrypt.hash(the_admin.password, salt_rounds);

  let sql_query = "INSERT INTO user (user_name, name, pwd_hash, role) VALUES (?, ?, ?, ?)"
  db.query(sql_query,[the_admin.username, the_admin.name,hashedPassword, 'admin'], (err,result,field)=>{
    if(err){
      console.log(err);
    }
    console.log("New admin with username `admin` is created.");
    console.log("Creaate New Accounts with different roles using your admin privilege.");
  })
}

make_the_admin();