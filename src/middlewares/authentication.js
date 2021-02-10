
const moongoose = require('mongoose')
const findSingleUser = require('../services/userServices')
const updateOneUser = require('../services/userServices')
const respondWithWarning = require('../helpers/responseHnadler')
const {verifyToken, formatJWTErrorMessage} = require('../helpers/jwt')


/**
 * Method to generate token
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */

   

 const authenticateUserToken = (req, res, next) => {
     const token = req.cookies.get('token', { signed: true}) || req.headers.authorization;
     if(!token) return respondWithWarning(res, 401, 'Session has Expired '); 

     try {
         const { key } = verifyToken(token); 
         req.auth = key; 
         return next(); 

     } catch (err) {
         return respondWithWarning(res, 401, formatJWTErrorMessage(err.message))
     }
 }


 const validUser = async (req, res, next) => {
     const { email } = req.body;
     const aggregate = moongoose.Aggregate([
         {email}, {username: username}
        ], 
        
        function(err, result) {
            console.log(result)
        }
     ) 

     const findUser = await findSingleUser(aggregate); 
     if(!findUser) return respondWithWarning(res, 401, 'Incorect Email or Password ')
     if(findUser.isBlocked) return respondWithWarning(res, 403, 'Forbidden! You have been banned from this Site')

     req.user = findUser.toJSON(); 
     return next()
 }


 /**
 * Check if user email already exists
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */

 const verifyUniqueUserEmail = async (req, res, next) => {
    const { email } = req.body;
    const findUser = await findSingleUser({ email });
    if (findUser) respondWithWarning(res, 409, 'User with this email already exists');
    return next();
 }

 /**
 * Check if username already exists
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */

 const verifyUniqueUsername = async(req, res, next) => {
    const { username } = req.body;
    const findUser = await findSingleUser({ username });
    if (findUser) respondWithWarning(res, 409, 'Username already taken');
    return next();
 }


 /**
 * Authenticate forgot password reset token
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */


 const authenticateForgotToken = async (req, res, next) => {
     const { token } = req.params; 
     try {
        const { key } = await verifyToken(token); 
        req.paramms.userId = key.userId; 
        return next(); 

     } catch (err) {
         const user = await updateOneUser({isPasswordReset: false}, {
             userId: user     //req.params.userId
         }); 

         return res.render('/linkExpired')
     }
 }


 /**
 * Function validate verification code link from email
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */


 const authenticateVerifyEmailToken = async (req, res, next) => {
     const { token } = req.params; 
     try {
         const { key } = await verifyToken(token); 
         req.params.userId = key.userId; 
         return next(); 
     } catch (err) {
         return res.redirect('/verificationLinkExpired')
     }
 }


module.exports = {
    authenticateForgotToken,
     authenticateUserToken, 
     authenticateVerifyEmailToken, 
     verifyUniqueUserEmail, 
     verifyUniqueUsername, 
     validUser
    }