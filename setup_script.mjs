import { createRequire } from 'module';
const mjs_require = createRequire(import.meta.url);
const prompt = mjs_require('prompt-sync')();
const { exec } = mjs_require("child_process");
const fs = mjs_require("fs");
const path = mjs_require("path");
const util = mjs_require("util");
const p_exec = util.promisify(exec);
const {check} = mjs_require("./util/input_checks.mjs");

console.log("\nThis is the Setup Script for this project.\n");

let repeat = false;

let pass_condition;

let server_port; 
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    server_port = prompt("Enter app server-port (2000 to 40000) : ");
    repeat = true;
    pass_condition = check.not_null(server_port) && check.type(server_port, "integer") && check.value_between(server_port, 2000, 40000);
}while(!(pass_condition)); repeat = false;

let jwt_secret;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    jwt_secret = prompt("Enter a secret key for JWT (minimum 32 characters) : ");
    repeat = true;
    pass_condition = check.not_null(jwt_secret) && check.length(jwt_secret, 32);
}while(!(pass_condition)); repeat = false;


let session_secret_key;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    session_secret_key = prompt("Enter a secret key for sessions (minimum 32 characters) : ");
    repeat = true;
    pass_condition = check.not_null(session_secret_key) && check.length(session_secret_key, 32);
}while(!(pass_condition)); repeat = false;

console.log("\nSetup Database (press enter to use the default values)\n");

let mysql_host;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    mysql_host = default_input("MySQL host (default localhost) : ", "localhost");
    repeat = true;
    pass_condition = true;
}while(!(pass_condition)); repeat = false;

let mysql_username;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    mysql_username = default_input("MySQL username (default root) : ", "root");
    repeat = true;
    pass_condition = true;
}while(!(pass_condition)); repeat = false;

let mysql_password;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    mysql_password = prompt("MySQL password : ");
    repeat = true;
    pass_condition = check.not_null(mysql_password);
}while(!(pass_condition)); repeat = false;

let mysql_port;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    mysql_port = default_input("MySQL Server Port (default 3306) : ", "3306");
    repeat = true;
    pass_condition = check.type(mysql_port, "integer");
}while(!(pass_condition)); repeat = false;

let admin_name;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    admin_name = default_input("Admin name (default admin) : ", "admin");
    repeat = true;
    pass_condition = true;
}while(!(pass_condition)); repeat = false;

let admin_password;
do{
    if(repeat)console.log("\nInvalid Input, try again...");
    admin_password = prompt("Password for the admin's account (minimum 10 characters) : ");    
    repeat = true;
    pass_condition = check.not_null(admin_password) && check.length(admin_password, 10);
}while(!(pass_condition)); repeat = false;

console.log("\nAlmost ready...");

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