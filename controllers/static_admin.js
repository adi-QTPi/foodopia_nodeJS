const {db} = require("../models/foodopiaDB");

async function handle_render_admin_page(req, res){
    let to_admin_page = req.session.to_admin_page;
    const x_user = req.x_user;
    to_admin_page = {
        ...to_admin_page,
        x_user : x_user,
    }
    if(!to_admin_page.page_date){
        to_admin_page = {
            ...to_admin_page,
        }
    }
    req.session.to_admin_page = null;
    res.status(200).render("admin", {to_admin_page});
}

module.exports = {
    handle_render_admin_page
}