const { exec } = require("child_process");
require("dotenv").config();

const shell = process.env.SHELL;
const m_username = process.env.MYSQL_USERNAME;
const m_host = process.env.MYSQL_HOST;
const m_port = process.env.MYSQL_PORT;
const m_password = process.env.MYSQL_PASSWORD;

const shell_command = `source ~/.zshrc | mysql -u ${m_username} -h ${m_host} -P ${m_port} -p${m_password}`;

exec(`${shell_command} < setup/createDB.sql`,{ shell : shell}, (error, stdout , stderr)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log("\nDatabase named `foodopia` created Successfully !");
});