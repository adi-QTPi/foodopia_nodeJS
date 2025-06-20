const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

async function auth_check_if_logged_in(req,res,next){
    const obtained_token = req.cookies.token;
    if(!obtained_token){
        req.session.to_login_page = {
            "message":"please log in to access the page."
        }
        return res.redirect("/static/login");
    }
    const curr_user = jwt.verify(obtained_token, JWT_SECRET);
    req.x_user = curr_user;
    next();
}

const auth_restrict_to = (array_of_allowed_roles) =>{
    return async (req,res,next) => {
        const { user_name, role } = req.x_user;
        if (array_of_allowed_roles.includes(role)){
            next();
        }
        else{
            req.session.to_error_page = {
                error : `${user_name} is NOT Authorised to visit`
            }
            return res.status(403).redirect("/static/error");
        }
    }
}

async function auth_just_check_if_logged_in(req, res,next){
    const obtained_token = req.cookies.token;
    if(obtained_token){
        const curr_user = jwt.verify(obtained_token, JWT_SECRET);
        req.x_user = curr_user;
    }
    next();
}

module.exports = {
    auth_check_if_logged_in,
    auth_restrict_to,
    auth_just_check_if_logged_in,
}