const express = require("express");
const router = express.Router();

const{
    handle_post_mark_item_complete
} = require("../controllers/api_cook");
const { 
    auth_check_if_logged_in, 
    auth_restrict_to 
} = require("../middleware/authorise");

router.use(
    auth_check_if_logged_in,
    auth_restrict_to(["cook"]),
);

router  
    .route("/")
    .post(handle_post_mark_item_complete);

module.exports = router;