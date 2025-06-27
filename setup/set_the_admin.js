const bcrypt = require('bcrypt');
const { db } = require("../models/foodopiaDB");
const p_db = db.promise();

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

  try{
    const [result] = await p_db.execute(sql_query, [the_admin.username, the_admin.name,hashedPassword, 'admin']);
  }catch(error){
    console.log(error);
  }finally{
    db.end();
    process.exit();
  }
}

make_the_admin();