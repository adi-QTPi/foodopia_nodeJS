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
    let to_signup_page = req.session.to_signup_page;
    if(req.x_user){
        to_signup_page = {
            ...to_signup_page,
            x_user:req.x_user
        }
    }

    req.session.to_signup_page = null;
    res.render("signup", {to_signup_page});
}

async function handle_render_menu_page(req,res){
    // let sql_query = `SELECT i.item_id, i.item_name, i.cook_time_min, i.price, i.display_pic, i.cat_id, c.cat_name, i.subcat_id, cd.cat_name FROM item i, category c, category cd WHERE i.cat_id = c.cat_id AND i.subcat_id = cd.cat_id;`

    let sql_query = "SELECT i.item_id, i.item_name, i.cook_time_min, i.price, i.display_pic, i.cat_id, c.cat_name AS cat_name, i.subcat_id, cd.cat_name AS subcat_name FROM item i JOIN category c ON i.cat_id = c.cat_id LEFT JOIN category cd ON i.subcat_id = cd.cat_id ORDER BY i.item_id;"

    db.query(sql_query, (err, result, fields)=>{
        if(err)return res.status(500).json(err);
        sql_query = `SELECT * FROM category ORDER BY cat_id;`;
        db.query(sql_query, (err, result2, fields)=>{
            if(err)return res.status(500).json(err);
            const to_menu_page = {
                user:req.x_user,
                result,
                result2
            }
            console.log(to_menu_page);
            return res.status(200).render("menu", {to_menu_page});
            // return res.status(200).json(result);
        })
    })
}

async function handle_render_cart_page(req,res){
    to_cart_page = {
        x_user : req.x_user,
    }
    res.render("cart", { to_cart_page });
}

async function handle_render_orders_page(req, res){
    //user wise order displau
    const curr_user = req.x_user;
    const user_id = curr_user.user_id;

    let date_in_query = ""; 
    let sql_query = "";
    if(req.session.date_to_fetch_order_for){
        date_in_query = req.session.date_to_fetch_order_for;
        sql_query = "SELECT order_id, table_no, order_at, status, total_price FROM `order` WHERE customer_id = ? AND DATE(order_at) = ? ORDER BY order_at DESC;"
        req.session.date_to_fetch_order_for = null; //present date by refresh
    }
    else{
        date_in_query = [];
        sql_query = "SELECT order_id, table_no, order_at, status, total_price FROM `order` WHERE customer_id = ? AND DATE(order_at) = CURDATE() ORDER BY order_at DESC;"
    }

    if(!date_in_query.length){
        req.session.to_orders_page = {
            ...req.session.to_orders_page,
            page_date: new Date().toLocaleDateString('en-CA'),
        }
    }
    else{
        req.session.to_orders_page = {
            ...req.session.to_orders_page,
            page_date: date_in_query,
        }
    }

    db.query(sql_query, [user_id, date_in_query],(err, result, fields)=>{
        if(err) return res.status(500).json(err);
        // let to_orders_page = {
        //     x_user : curr_user,
        //     order_details : result,
        //     // page_date : new Date().toLocaleDateString('en-CA'),
        // }

        // if(req.session.to_orders_page){
        //     to_orders_page = {
        //         ...req.session.to_orders_page,
        //         ...to_orders_page,
        //     }
        // }

        let to_orders_page = {
            ...req.session.to_orders_page,
            x_user: curr_user,
            order_details:result,
        }
        // req.session.to_orders_page.page_date = new Date().toLocaleDateString('en-CA');
        
        res.status(200).render("orders", {to_orders_page});
    })
}

async function handle_render_order_by_id(req, res){
    let to_order_by_id_page = {
        ...req.session.to_order_by_id_page,
        x_user:req.x_user,
    }
    console.log(to_order_by_id_page);
    res.status(200).render("order_by_id", { to_order_by_id_page });
}   

async function handle_render_error_page(req, res){
    let to_error_page = {};
    if(req.session.to_error_page){
        to_error_page = {
            ...to_error_page,
            ...req.session.to_error_page,
        }
    }
    res.render("error", {to_error_page});
}

module.exports = {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
    handle_render_menu_page,
    handle_render_cart_page,
    handle_render_orders_page,
    handle_render_order_by_id,
    handle_render_error_page,
}