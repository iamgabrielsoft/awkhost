const findSingleUser = require('../services/userServices')
const {verifyToken, formatJWTErrorMessage} = require('../helpers/jwt');



class CookieHandler {
    constructor(){}; 

    /**
 * Method to clear all logged in cookies
 * @param {object} res
 */

    clearCookies(res) {
        res.cookies.set('signOut'); 
        res.cookies.set('token')
        res.cookies.set('username'); 
        res.cookies.set('isVerified')
    }

    validateCookies(req, res, next) {
        token = req.cookies.get('token', { signed: true}); 
        username = req.cookies.get('username', { signed: true}); 
        isAdmin = req.cookies.get('isAdmin', { signed: true});
        isVerified = req.cookies.get('isVerified', { signed: true})

        try {
            if(token){
                const { key } = verifyToken(token); 
                req.auth = key; 
                req.auth.username = username; 
                req.auth.isAdmin = isAdmin; 
                req.auth.isVerified = isVerified;
                return next()
            }

        } catch (err) {
            this.clearCookies(res)
            //send-out a query here
          return res.redirect('/login?expired=1');  // return respondWithWarning(res, 401, formatJWTErrorMessage(error.message));
        }

        req.auth = {}; 
        req.isAuth = false; 
        return next(); 
    }

        /**
     * Set httpOnly key after sign in
     * @param {object} req
     * @param {Express.Response} res
     * @param {Function} next
     * @returns {Function} next middleware
     */

     signUserIn(req, res, next) {
         const token = req.cookies.get('pages/signin'); 
         if(token) res.cookies.get('pages/signin') //delete the login cookies of the user

         try {
             const { token } = verifyToken(token); 
             const user = findSingleUser({ userId: key.userId }); 

             req.auth = key; 
             req.auth.username = user.username; 
             req.auth.isAdmin = user.isAdmin; 
             req.auth.verified = user.verified; 
             res.cookies.set('token', token, { signed: true}); //set httponly 
             req.cookies.set('username', user.username, { signed: true})
             req.cookies.set('isAdmin', user.isAdmin, { signed: true })
             res.cookies.set('isVerified', user.isVerified, { signed: true });
             return next(); 

         } catch (err) {
             this.clearCookies(res); 
             res.redirect('pages/signin?expired=1') // return respondWithWarning(res, 401, formatJWTErrorMessage(error.message));
         }

         return next();  
     }

     /**
     * Sign user out
     * @param {object} req
     * @param {object} res
     * @param {Function} next
     * @returns {Function} next middleware
     */

     signUserOut(res, req, next) {
         const signOut = req.cookies.get('signOut')
         if(signOut) {
            this.clearCookies(res);
            req.auth = {}; 
            req.isAuth = false;  
         }

         return next(); 
     }
}



module.exports = CookieHandler; 