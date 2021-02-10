
const AdminController = require('../controllers/AdminController')
const admincontroller = new AdminController()
const router = require('express').Router(); 

    //   //admin user

    router.get('/admin', checkRenderIsAdmin, (req, res) => res.render('./admin/index', {
      isAuth: req.isAuth,
      username: req.auth.username,
      profileImage: req.auth.profileImage,
      isAdmin: req.auth.isAdmin,
      isVerified: req.auth.isVerified,
      meta: { title: 'Admin Home - Is This A Real Job', description: genericDescription }
    }));

    router.get('admin/users', usercontroller.checkIsAdmin, admincontroller.renderAdminUsersPage)
    router.get('admin/dashboard', usercontroller.checkIsAdmin)   //implement the dashboard for the admin 
