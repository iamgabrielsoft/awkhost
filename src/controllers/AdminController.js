
class AdminController{
    constructor(){}

    async renderAdminUsersPage(req, res) {
        return res.render('admin/users', {
            users: users || [],
            //page: req.query.page || 1,
            //pages,
            isAuth: req.isAuth,
            //profileImage: req.auth.profileImage,
            isAdmin: req.auth.isAdmin,
            username: req.auth.username,
            //name: req.auth.name,
            isVerified: req.auth.isVerified,
          });
    }
    
    checkIsAdmin(req, res, next) {
        if(req.isAdmin) return res.render('/admin'); 
        return next()
    }

    renderLoginPage(req, res) {
        const { expired } = req.query; 
        let error; 

        if(Number(expired) == 1) error = 'Session Has Expired!'; 

        return res.render('/signin', {
            isAuth: req.isAuth,
            isAdmin: req.auth.isAdmin,
            meta: { title, description },
            error
        })
    }
}

module.exports = AdminController