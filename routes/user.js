const express = require("express");
const router = express.Router();

const { 
    check_new_user_detail_entry, 
    hash_password,
} = require("../middleware/user");

const {

} = require("../middleware/authenticate")

const {
    handle_get_all_users,
    handle_get_user_by_id,
    handle_delete_user_by_id,
    handle_post_create_new_user,
} = require("../controllers/user");

const {
    handle_post_login_existing_user,
} = require("../controllers/authenticate");

router
    .route("/")
    .get(handle_get_all_users)

router  
    .route("/:id")
    .get(handle_get_user_by_id)
    .delete(handle_delete_user_by_id)

router
    .route("/signup")
    .post(check_new_user_detail_entry,hash_password,handle_post_create_new_user)

router
    .route("/login")
    .post(handle_post_login_existing_user);

module.exports = router;