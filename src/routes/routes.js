
const express = require('express')
const app = express()
const router = express.Router(); 
const UsersController = require('../controllers/userController')
const UserAuth = require('../controllers/authController');
const CookieHandler = require('../middlewares/cookieHandler')
const cookieInit = new CookieHandler()
const usercontroller = new UsersController()
const userAuthinit = new UserAuth()
const githubAuthenticate = require('../middlewares/githubAuth')
const githubAuthCallback = require('../middlewares/githubAuth')
const googleAuthentication = require('../middlewares/googleAuth')
const  googleAuthCallBack = require('../middlewares/googleAuth')
const validateSignupFormData = require('../middlewares/validAuth')
const verifyUniqueUserEmail = require('../middlewares/authentication').verifyUniqueUserEmail; 
const verifyUniqueUsername = require('../middlewares/authentication').verifyUniqueUsername; 




const {  
    validUser, 
    authenticateUserToken,   
    authenticateForgotToken, 
    authenticateVerifyEmailToken, 
    validateAdmin, 
    validateSigninFormData,  
    validateNewPasswordForm, 
    validateForgotPasswordForm, 
    checkIfSameUser, 
    checkUserPasswordReset, 
    validateUserByUsername, 
    validateByEmail, 
    validateUserById } = require('../middlewares/middleware')

    router.get('/', (req, res) => {res.render('layout') })


    //Auth routes { isAuth: req.isAuth, isAdmin: req.auth.isAdmin, meta: { title: 'Register - Is This A Real Job', description: descriptions.register } })
    router.post('/signup', usercontroller.checkRenderIsAuth)
    router.get('/signup', usercontroller.checkRenderIsAuth, (req, res) => res.render('signup', {
            reAuth: req.isAuth, 
            isAdmin: req.auth
        }))

   
    router.get('/verify/:token', authenticateVerifyEmailToken, validateUserById, usercontroller.verifyEmailLink)
    router.get('/signin', usercontroller.checkRenderIsAuth, usercontroller.renderLoginPage);
    

    //google signup
    router.get('/auth/google', googleAuthentication); 
    // router.get('/auth/google/redirect', googleAuthCallBack);



    // //github signup 
    // router.get('/auth/github', githubAuthenticate)
    // router.get('/auth/github/redirect', githubAuthCallback)


    //API's
    router.post('/api/v1/auth/signup',
          validateSignupFormData,  
          verifyUniqueUserEmail, 
          verifyUniqueUsername, 
          userAuthinit.signup,
    ); 

    
    //Resend Verification 
    router.get('/resendverification', authenticateUserToken, usercontroller.sendUserVerification)


    //Resend Verification 
    router.get('/resendverification', authenticateUserToken, usercontroller.sendUserVerification)


    //Reset Password By Email 
    router.get('/users/reset-password/:token', authenticateForgotToken, validateUserById, checkUserPasswordReset, (req, res) => 
        res.render('resetPassword', {
            token: req.params.token,
            isAuth: req.isAuth,
            isAdmin: req.auth.isAdmin,
            username: req.auth.username,
            name: req.auth.name,
            isVerified: req.auth.isVerified,
            meta: { title: 'Reset Password - Is This A Real Job', description: genericDescription }
        }))



    //Other routes
    router.get('/domain', (req, res) => { res.render('domain') })
    router.get('/cloud', (req, res) => { res.render('cloud')})
    router.get('/wordpress', (req, res) => { res.render('wordpress')})
    router.get('/emailservices', (req, res) => res.render('emailservices'))
    router.get('/about', (req, res) => { res.render('about')})
    router.get('/terms', (req, res) => { res.render('terms')})




      router.get('/linkexpired', (req, res) => res.render('linkExpired', {
            isAuth: req.isAuth,
            isAdmin: req.auth.isAdmin,
            username: req.auth.username,
            name: req.auth.name,
            isVerified: req.auth.isVerified,
            meta: { title: 'Expired Link- Is This A Real Job', description: genericDescription }
        }));


      router.get('/verificationLinkExpired', (req, res) => res.render('verificationLinkExpired', {
        isAuth: req.isAuth,
        isAdmin: req.auth.isAdmin,
        username: req.auth.username,
        name: req.auth.name,
        isVerified: req.auth.isVerified,
        meta: { title: 'Expired Link- Is This A Real Job', description: genericDescription }
      }))


      


const initRoutes = ()  => {
    //cookies Handlers before call 
    app.use(cookieInit.validateCookies)
    app.use(cookieInit.signUserIn)
    app.use(cookieInit.signUserOut)
    

    //   //Fallback case for unknown URLS
      app.get('/notAuthorized', (req, res) => res.render('401', { meta: { title: '404 - Page Not Found', description: genericDescription }} ))
      app.get('/forbiden', (req, res) => res.render('403', { meta: { title: '403 - Forbidden Route', description: genericDescription } }));
      app.all('*', (req, res) => res.render('404', { meta: { title: '404 - Page Not Found', description: genericDescription } }));
}




module.exports  = router