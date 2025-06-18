const express = require("express");
const router = express.Router();

const{
    handle_render_admin_page
} = require("../controllers/static_admin");

const { 
    auth_check_if_logged_in, auth_restrict_to 
} = require("../middleware/authorise");

const { 
    fetch_all_order_data, 
} = require("../middleware/static_admin");

const {
    handle_render_signup_page
} = require("../controllers/static")

router.use(
    auth_check_if_logged_in,
    auth_restrict_to(["admin"]),
)

router  
    .route("/create_new")
    .get(
        handle_render_signup_page
    )

router  
    .route("/")
    .get(
        fetch_all_order_data,
        handle_render_admin_page
    )

module.exports = router;