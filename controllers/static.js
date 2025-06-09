const {db} = require("../models/foodopiaDB");

async function handle_render_login_page(req, res){
    // const error = req.flash("error");
    // const error = req.session.error;
    const to_login_page = req.session.to_login_page
    req.session.to_login_page = null;
    return res.render("login", {to_login_page});
}

async function handle_render_profile_page(req,res){
    const curr_user = req.x_user;
    res.render("profile", {curr_user});
}

async function handle_render_signup_page(req,res){
    const to_signup_page = req.session.to_signup_page;
    req.session.to_signup_page = null;
    res.render("signup", {to_signup_page});
}

async function handle_render_menu_page(req,res){
    let sql_query = `SELECT i.item_id, i.item_name, i.cook_time_min, i.price, i.display_pic, i.cat_id, c.cat_name, i.subcat FROM item i, category c WHERE i.cat_id = c.cat_id;`

    db.query(sql_query, (err, result, fields)=>{
        if(err)return res.status(500).json(err);

        sql_query = `SELECT * FROM category;`;
        db.query(sql_query, (err, result2, fields)=>{
            if(err)return res.status(500).json(err);
            const to_menu_page = {
                user:req.x_user,
                result,
                result2
            }
            return res.status(200).render("menu", {to_menu_page});
            // return res.status(200).json(result);
        })
    })
}

module.exports = {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
    handle_render_menu_page,
}