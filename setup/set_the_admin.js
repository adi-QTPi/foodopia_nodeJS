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
    console.log("admin is added");
  })
}

make_the_admin();

const def_cook = {
  username : process.env.COOK_USER_NAME,
  name:process.env.COOK_NAME,
  password : process.env.COOK_PASSWORD
}

async function make_a_cook() {
  const salt_rounds = 10;
  const hashedPassword2 = await bcrypt.hash(def_cook.password, salt_rounds);

  let sql_query = "INSERT INTO user (user_name,name, pwd_hash, role) VALUES (?, ?, ?, ?)"

  db.query(sql_query,[def_cook.username,def_cook.name, hashedPassword2, 'cook'], (err, result, fields)=>{
    if(err){
      console.log(err);
    }
    console.log("cook is added");
  } )
}

make_a_cook();