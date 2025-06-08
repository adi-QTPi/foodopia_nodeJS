async function handle_render_login_page(req, res){
    // const error = req.flash("error");
    const error = req.session.error;
    req.session.error = null;
    return res.render("login", {err:error});
}

async function handle_render_profile_page(req,res){
    const curr_user = req.x_user;
    res.render("profile", {curr_user});
}

async function handle_render_signup_page(req,res){
    res.render("signup");
}

module.exports = {
    handle_render_login_page,
    handle_render_profile_page,
    handle_render_signup_page,
}