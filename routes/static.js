const express = require("express");
const router = express.Router();

const {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
    handle_render_menu_page,
    handle_render_cart_page,
    handle_render_orders_page,
} = require ("../controllers/static");

const { 
    auth_check_if_logged_in, 
    auth_restrict_to
} = require("../middleware/authorise");

router
    .route("/login")
    .get(handle_render_login_page)

router
    .route("/signup")
    .get(handle_render_signup_page)

router.use(auth_check_if_logged_in)
router
    .route("/profile")
    .get(handle_render_profile_page)
router
    .route("/menu")
    .get(handle_render_menu_page)
router  
    .route("/cart")
    .get(handle_render_cart_page)
router
    .route("/orders") //show all order by particular user
    .get(handle_render_orders_page)


module.exports = router;