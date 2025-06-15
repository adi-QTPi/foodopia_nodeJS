const express = require("express");
const router = express.Router();

const {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
    handle_render_menu_page,
    handle_render_cart_page,
    handle_render_orders_page,
    handle_render_order_by_id,
} = require ("../controllers/static");

const { 
    auth_check_if_logged_in, 
    auth_restrict_to
} = require("../middleware/authorise");

const { 
    fetch_order_data_by_id,
} = require("../middleware/static");

router
    .route("/login")
    .get(handle_render_login_page)

router
    .route("/signup")
    .get(
        handle_render_signup_page
    )

router.use(auth_check_if_logged_in)
router
    .route("/profile")
    .get(handle_render_profile_page)
router
    .route("/menu")
    .get(
        auth_restrict_to(["customer", "admin", "cook"]),
        handle_render_menu_page
    )
router  
    .route("/cart")
    .get(
        auth_restrict_to(["customer"]),
        handle_render_cart_page
    )
router
    .route("/orders")
    .get(
        auth_restrict_to(["customer"]),
        handle_render_orders_page
    )
router  
    .route("/orders/:id")
    .get(
        fetch_order_data_by_id,
        handle_render_order_by_id
    )

module.exports = router;