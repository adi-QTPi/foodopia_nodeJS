const { exec } = require("child_process");
require("dotenv").config();

const shell = process.env.SHELL;

exec("echo $PATH",{ shell : shell}, (error, stdout , stderr)=>{
    if(error){
        console.log(error);
        return;
    }
    if(stdout)console.log(stdout);
    if(stderr)console.log(stderr);
});