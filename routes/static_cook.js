const express = require("express");
const router = express.Router();

const {
    handle_render_cook_page,
} = require("../controllers/static_cook");

const { 
    auth_check_if_logged_in, auth_restrict_to 
} = require("../middleware/authorise");

router.use(auth_check_if_logged_in, auth_restrict_to(["cook"]));
router  
    .route("/")
    .get(handle_render_cook_page)

module.exports = router;