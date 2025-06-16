const bcrypt = require('bcrypt');
const { db } = require("../models/foodopiaDB");

const the_admin = {
  username: admin,
  password: process.env.ADMIN_PASSWORD
}

async function make_the_admin() {
  const salt_rounds = 10;
  const hashedPassword = await bcrypt.hash(the_admin.password, salt_rounds);

  await db.query(
    "INSERT INTO user (user_name, pwd_hash, role) VALUES (?, ?, ?)",
    ['admin', hashedPassword, 'admin']
  );
}

make_the_admin();

const def_cook = {
  username : process.env.COOK_NAME,
  password : process.env.COOK_PASSWORD
}

async function make_a_cook() {
  const salt_rounds = 10;
  const hashedPassword2 = await bcrypt.hash(def_cook.password, salt_rounds);

  await db.query(
    "INSERT INTO user (user_name, pwd_hash, role) VALUES (?, ?, ?)",
    [def_cook.username, hashedPassword2, 'cook']
  );
}