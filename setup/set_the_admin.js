const bcrypt = require('bcrypt');
const {db} = require("../models/foodopiaDB");

const the_admin = {
    username: admin,
    password: process.env.DEFAULT_ADMIN_PASSWORD
}

async function make_the_admin() {
  const salt_rounds = 10;
  const hashedPassword = await bcrypt.hash(the_admin.password, salt_rounds);
  
  await db.users.create({
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin'
  });
}