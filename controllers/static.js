async function handle_render_login_page(req, res){
    // const error = req.flash("error");
    // const error = req.session.error;
    const to_login_page = req.session.to_login_page
    req.session.to_login_page = null;
    return res.render("login", {to_login_page});
}

async function handle_render_profile_page(req,res){
    const curr_user = req.x_user;
    res.render("profile", {curr_user});
}

async function handle_render_signup_page(req,res){
    const to_signup_page = req.session.to_signup_page;
    req.session.to_signup_page = null;
    res.render("signup", {to_signup_page});
}

module.exports = {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
}