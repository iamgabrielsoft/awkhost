
const _ = require('lodash')
const crypto = require('crypto')
const {findSingleUser, fetchSingleUser, findUsers, updateOneUser} = require('../services/userServices')
const {respondWithSuccess, respondWithWarning } = require('../helpers/responseHnadler');
const generateResetToken = require('../helpers/jwt');
const passwordHash = require('../helpers/hash');
const generateToken = require('../helpers/jwt');
const newUserVerificationEmail = require('../helpers/emailTemplate')
const SITE_URL = require('../config/constants');
const sendMail = require('../services/emailServices');

class UserController {
    constructor() {}; 

    async blockUser(req, res) {
        const { userId } = req.params; 
        const isBlocked = req.user.isBlocked ? false : true; 

    }

    async getUsers(req, res) {
        const users = await findUsers(); 
        return respondWithSuccess(res, 200, 'Successful', users)
    }

        /**
     * Fetch one user for render endpoints
     * @param {object} req
     * @param {object} res
     * @returns {object} json response
     */

     async getUserbyId(req, res, next) {
         const { userId } = req.auth; 
         if(!userId) return res.redirect('pages/signin')
         const user = await findSingleUser({userId}); 
         req.user = user; 
         next(); 
     }

     checkIsAdmin(req, res, next) {
         if(req.isAdmin) return res.render('/layout'); 
         return next()
     }

     async getUser(req, res) {
         const { username } = req.params; 

         try {
            const user = await fetchSingleUser({ username }); 
            if(!user) return respondWithWarning(res, 404, 'User Not Found', user); 
            return respondWithSuccess(res, 200, 'User Found', user)

         } catch (err) {
             return respondWithWarning(res, 500, 'Error Fetching User', user)
         }
         
     }

     async renderReportUserPage(req, res) {
         res.render('/layout', {
            isAuth: req.isAuth,
            username: req.auth.username,
            isAdmin: req.auth.isAdmin,
            reportedUser: req.user,
            isVerified: req.auth.isVerified,
            crypto
         })
     }

     async renderUserProfile(req, res) {
        const { username } = req.params;

        const user = await fetchSingleUser({ username });
        if (!user) {
          return res.render('404', { status: 404 });
        }
      
        return res.render('userProfile', {
          user,
          userId: user.userId,
          isAuth: req.isAuth,
          isAdmin: req.auth.isAdmin,
          username: req.auth.username,
          isVerified: req.auth.isVerified,
          crypto
        });
     }

     async forgotPassword(req, res) {
         if(req.user.isPasswordRest) {
             updateOneUser({isPassword: true}), {userId: req.user.userId}
         }

         const token = generateResetToken({userId: req.user.userId}, {expiresIn: '1h'})
         const mailBody = resetPasswordEmail(req.user.name, SITE_URL, token, req.body.email);
        
          try {
            const user = await updateOneUser({ isPasswordReset: true }, { email: req.user.email });
            const sendEmail = sendMail(req.body.email, 'ITARJ - Reset Password', mailBody);
            return respondWithSuccess(res, 200, 'A link has been sent to your email. Kindly follow that link to reset your password');
          } catch (error) {
            return respondWithWarning(res, 500, 'Server Error');
          }
     }


     async resetforgotPassword(req, res) { 
         try {
            const { password } = req.body; 
            const HashedPassword = await passwordHash(password);
            const user = await updateOneUser({ password: HashedPassword, isPasswordReset: false}, {email: req.user.email})
            return respondWithSuccess(res, 200, 'Password Reset Successfully', _.omit(user.toJSON()), ['Password'])
         } catch (err) {
             console.log(err)
            return respondWithWarning(res, 500, 'Server Encoutered an Error')   
         }
        }

        async checkVerification(req, res, next) {
            const user = await findSingleUser({userId: req.auth.userId}); 
            console.log(user); 
            if(!user.isVerified) return respondWithWarning(res, 403, 'Please Verify Your Account!'); 
            return next(); 
        }

        /**
         * Function sends verification code to user email
         * @param {Object} req the request object
         * @param {Object} res the response object
         * @returns {Object} this returns an object
         */

         async sendUserVerification(req, res, next) {
             const payload = {userId: req.auth.userId, isAdmin: req.isAdmin}; 
             const token = generateToken(payload); 
             const user = await findSingleUser({userId: req.auth.userId})

             if(user.isVerified) return res.redirect('/layout'); 

             const mailBody = newUserVerificationEmail(user.name, SITE_URL, req.body.email); 
             const SendMail = sendMail(user.email, 'ITARJ - Verify Email', mailBody);
             const description = 'Our app helps helps you to keep your website and your application safe.';
                return res.render('verifyAccount', {
                    isAuth: req.isAuth,
                    isAdmin: req.auth.isAdmin,
                    isVerified: req.auth.isVerified,
                    meta: { title: 'Verify Account - ITARJ', description }
                });

         }

         /**
         * Function sets user verification to true
         * @param {Object} req the request object
         * @param {Object} res the response object
         * @returns {Object} this returns an object
         */

         async verifyEmailLink(req, res, next) {
             const user = await updateOneUser({isVerified: true}, { userId: req.user.isVerified})
             if(!user) return res.redirect('/verificationExpiredLink'); 


             //handle get started on Email 
             req.auth.isVerified = true;
             res.cookies.set('isVerified', user.isVerified, { signed: true });
             return res.redirect('/posts');
         }
}


module.exports = UserController