const express = require("express");
const router = express.Router();

const {
    handle_render_login_page,
    handle_render_profile_page,
} = require ("../controllers/static");

const { 
    auth_check_if_logged_in, 
    auth_restrict_to
} = require("../middleware/authorise");

router
    .route("/login")
    .get(handle_render_login_page)

router.use(auth_check_if_logged_in)
router
    .route("/profile")
    .get(handle_render_profile_page)

module.exports = router;