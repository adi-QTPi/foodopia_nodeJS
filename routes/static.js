const express = require("express");
const router = express.Router();

const {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
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

module.exports = router;