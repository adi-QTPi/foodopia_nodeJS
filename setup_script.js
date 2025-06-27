const prompt = require("prompt-sync")();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const util = require("util");
const p_exec = util.promisify(exec);

console.log("This is the Setup Script for this project.\n");


const server_port = prompt("Enter app server-port (2000 to 40000) : ");
const jwt_secret = prompt("Enter a secret key for JWT : ");
const session_secret_key = prompt("Enter a secret key for Sessions : ");

console.log("\nSetup Database (press enter to use the default values)\n");

const mysql_host = default_input("MySQL host (default localhost) : ", "localhost");

const mysql_username = default_input("MySQL username (default root) : ", "root");
const mysql_password = prompt("MySQL password : ");
const mysql_port = default_input("MySQL Server Port (default 3306) : ", 3306);

const admin_name = default_input("Admin name (default admin) : ", "admin");
const admin_password = prompt("Password for the admin's account : ");

console.log("\nAlmost ready...");
const shell = default_input("This script would run mysql commands, choose a shell (default shell -> /bin/zsh : ", "/bin/zsh");

const env_file = ".env";

fs.writeFileSync(env_file, `SERVER_PORT="${server_port}"`, "utf8" );

fs.appendFileSync(env_file, `\nJWT_SECRET="${jwt_secret}"`, "utf8" );
fs.appendFileSync(env_file, `\nSESSION_SECRET_KEY="${session_secret_key}"`, "utf8" );

fs.appendFileSync(env_file, `\nMYSQL_HOST="${mysql_host}"`, "utf8" );
fs.appendFileSync(env_file, `\nMYSQL_USERNAME="${mysql_username}"`, "utf8" );
fs.appendFileSync(env_file, `\nMYSQL_PASSWORD="${mysql_password}"`, "utf8" );
fs.appendFileSync(env_file, `\nMYSQL_PORT="${mysql_port}"`, "utf8" );

fs.appendFileSync(env_file, `\nADMIN_NAME="${admin_name}"`, "utf8" );
fs.appendFileSync(env_file, `\nADMIN_PASSWORD="${admin_password}"`, "utf8" );
fs.appendFileSync(env_file, `\nSHELL="${shell}"`, "utf8" );

async function setup_chores(){
    try{
        const { stdout, stderr } = await p_exec("node setup/create_db.js");
        if (stdout) console.log(stdout);

        const { stdout2, stderr2 } = await p_exec("node setup/set_the_admin.js");
        if(stdout2) console.log(stdout2);
        console.log("New admin with username `admin` is created.");
        console.log("Create New Accounts with different roles using your admin privilege.");

        console.log("\nAlso...We have a gift for you <3 we offer you dummy data for the menu !");
        const to_add_dummy_data = default_input("enter `y` to accept [any other input means you reject this gift :(] : ");
        if(to_add_dummy_data === "y"){
            const { stdout, stderr } = await p_exec("node setup/add_dummy_db.js");
            if(stdout) console.log(stdout);
        }

        console.log("\nEt voilà...Your setup is complete, now just run `npm start` to visit the site.");
        console.log("bye");
    }catch(error){
        console.log("error in setup, ", error);
    }
}

setup_chores();


function default_input(prompt_text, default_value){
    let set_variable;
    const response = prompt(prompt_text);
    if(!response)set_variable = default_value;
    else set_variable = response;

    return set_variable;
};

module.exports = {
    default_input
}