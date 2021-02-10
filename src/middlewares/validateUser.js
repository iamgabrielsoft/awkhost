
const respondWithWarning = require('../helpers/responseHnadler')
const {findSingleUser, updateOneUser} = require('../services/userServices')

/**
 * Function to check if a user ID is valid
 * @param {Object} req is a request object
 * @param  {Object} res is a response object
 * @param {Function} next this is a function 
 * @returns {Function} response 
 */

 const validateUserById = async (req, res, next) => {
     const { userId } = req.params; 
     const findUser = await findSingleUser({ userId})
     if(!findUser) return respondWithWarning(res, 404, 'User Not Not Found');
     req.user = findUser.toJSON(); 
     return next(); 
 }


 /**
  * Function to check if a email is valid 
  * @param {Object} req is a request object
  * @param {Object} res is a response object
  * @param {Function} next this is a function 
  * @returns {Function} response 
  */

 const validateByEmail = async (req, res, next) => {
     const { email } = req.params; 
     const findUser = await findSingleUser({ email }); 
     if(!findUser) return respondWithWarning(res, 404, `User not found with this ${email}`)

     req.user = findUser.toJSON(); 
     return next(); 
 }


 /**
  * Check if username already exists
  * @param {Express.Request} req
  * @param {Express.Response} res
  * @param {Function} next
  */


  const validateUserByUsername = async (req, res) => {
      const { username } = req.user; 
      const findUser = await findSingleUser({ username }); 
      if(!findUser) return respondWithWarning(res, 404, `${username} is not Found in Our Database`)

      req.user = findUser.toJSON(); 
      return next(); 
  }

  
  /**
   * Function to user is a user has a password reset
   * @param {Object} req this is the request
   * @param {Object} res this is the response 
   * @param {Function} next is a function 
   */

   
   const checkUserPasswordReset = async (req, res, next) => {
       if(!req.user.isPasswordReset) return res.redirect('pages/signin') //link has expired 
       return next(); 
   }

   /**
    * @param {*} req
    * @param {*} res
    * @param {*} next
    */

    const checkIfSameUser = async (req, res, next) => {
        const { username } = req.params; 
        if(req.auth.username === username) return res.render('404', {status: 404}); 
        return next(); 
    }


    

module.exports = {
    checkIfSameUser, 
    checkUserPasswordReset, 
    validateUserByUsername, 
    validateByEmail, 
    validateUserById
}

