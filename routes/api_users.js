const express = require("express");
const router = express.Router();

const { 
    check_password_confirmation,
    check_password_strength,
    check_new_user_detail_entry_signup, 
    hash_password,
} = require("../middleware/api_user");

const {
    check_user_detail_entry_login,
    check_password_and_add_user_info,
} = require("../middleware/authenticate")

const {
    auth_restrict_to,
    auth_check_if_logged_in,
} = require("../middleware/authorise")

const {
    handle_get_all_users,
    handle_get_user_by_id,
    handle_delete_user_by_id,
    handle_post_create_new_user,
    handle_post_user_logout,
} = require("../controllers/api_user");

const {
    handle_login_assign_jwt,
} = require("../controllers/authenticate");


router
    .route("/login")
    .post(
        check_user_detail_entry_login,
        check_password_and_add_user_info,
        handle_login_assign_jwt
    )
    
router
    .route("/signup")
    .post(
        check_new_user_detail_entry_signup,
        check_password_confirmation,
        check_password_strength,
        hash_password,
        handle_post_create_new_user
    )

router.use(auth_check_if_logged_in);
router
    .route("/")
    .get(auth_restrict_to(["admin"]),handle_get_all_users)
    
router  
    .route("/logout")
    .post(handle_post_user_logout)
    
router  
    .route("/:id")
    .get(handle_get_user_by_id)
    .delete(handle_delete_user_by_id)


module.exports = router;