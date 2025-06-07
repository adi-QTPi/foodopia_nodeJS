const express = require("express");
const router = express.Router();

const { 
    check_new_user_detail_entry_signup, 
    hash_password,
} = require("../middleware/user");

const {
    check_user_detail_entry_login,
    check_password_and_add_user_info,
} = require("../middleware/authenticate")

const {
    handle_get_all_users,
    handle_get_user_by_id,
    handle_delete_user_by_id,
    handle_post_create_new_user,
} = require("../controllers/user");

const {
    handle_login_assign_jwt,
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
    .post(check_new_user_detail_entry_signup,hash_password,handle_post_create_new_user)

router
    .route("/login")
    .post(check_user_detail_entry_login,check_password_and_add_user_info,handle_login_assign_jwt);

module.exports = router;