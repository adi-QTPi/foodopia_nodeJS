const {db} = require("../models/foodopiaDB");

async function handle_post_orders_by_date(req, res){
    const asked_date_for_orders = req.body.date;
    req.session.date_to_fetch_order_for = asked_date_for_orders;
    req.session.to_admin_page = {
        ...req.session.to_admin_page,
        page_date:asked_date_for_orders,
    }
    res.status(200).redirect("/static/admin");
}

module.exports = {
    handle_post_orders_by_date
}