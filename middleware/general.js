const multer = require("multer");
const upload = multer();

const check_for_entries_in_array = (array_of_required_fields) => {
    return async (req, res, next) => {
        for (const field of array_of_required_fields){
            if(!req.body[field]){
                let redirect_to = "";

                if(req.originalUrl === "/api/admin/create_new"){
                    req.session.to_signup_page = {
                        error:"Please enter all the required fields properly."
                    }
                    redirect_to= "/static/admin/create_new";
                }
                else if(req.originalUrl === "/api/cat"){
                    req.session.to_menu_page = {
                        error:"Please enter all the required fields properly."
                    }
                    redirect_to= "/static/menu";
                }
                else if(req.originalUrl === "/api/item"){
                    req.session.to_menu_page = {
                        error:"Please enter all the required fields properly."
                    }
                    redirect_to= "/static/menu";
                }

                else{
                    req.session.to_error_page = {
                        status:400,
                        status_meaning:"Bad Request",
                        error: "Please enter all the required fields properly."
                    }
                    redirect_to = "/static/error"
                }
                
                return res.redirect(redirect_to);
            }
        }
        next();
    }
}

module.exports = {
    check_for_entries_in_array,
}