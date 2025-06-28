const { exec } = require("child_process");
require("dotenv").config();

const m_username = process.env.MYSQL_USERNAME;
const m_host = process.env.MYSQL_HOST;
const m_port = process.env.MYSQL_PORT;
const m_password = process.env.MYSQL_PASSWORD;

const shell_command = `source ~/.zshrc | mysql -u ${m_username} -h ${m_host} -P ${m_port} -p${m_password}`;

exec(`${shell_command} < setup/add_dummyDB.sql`, (error, stdout , stderr)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log("\nDummy Data added successfully !");
});
