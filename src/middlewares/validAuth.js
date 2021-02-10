const Joi = require('@hapi/joi')
const joiValidator = require('../helpers/joiValidator') 
const respondWithWarning = require('../helpers/responseHnadler')



/**
 * validate sigin email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
 
 const validateSigninFormData = (req, res, next) => {
      const createSignInSchema = Joi.object().keys({
          username: Joi.string().required(), 
          password: Joi.string().required(), 
          email: Joi.string()
                .required()
                .trim()
      })

      const errors = joiValidator(req.body, createSignInSchema);
      if(errors) respondWithWarning(res, 400, 'Bad Input', errors)
      return next(); 
 }

 

 /**
 * validate signup email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */

 const validateSignupFormData = async (req, res, next) => {
     const signupData = Joi.object().keys({
         username: Joi.string().required(), 
         password: Joi.string().required(), 
         email: Joi.string()
                .required()
                .trim()
        })

     const errors = joiValidator(req.body, signupData); 
     if(!errors) next(); ////
     return respondWithWarning(res, 400, 'Bad Sign-Up Input', errors); 
      
 }



 const googleSignup = (googleUser) => {
    var profile = googleUser.getBasicProfile(); 
    $('.g-signin2').css('display', 'none'); 
    $('.data').css('display', 'block'); 
    $('.pic').attr('src', profile.getImageUrl()); 
    $('.email').text(profile.getEmail())
}



 module.exports = validateSigninFormData, validateSignupFormData, googleSignup