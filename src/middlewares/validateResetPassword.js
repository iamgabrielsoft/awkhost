
const Joi  = require('@hapi/joi')

const joiValidator = require('../helpers/joiValidator')
const respondWithWarning = require('../helpers/responseHnadler')

/**
 * validate Reset-email 
 * @param  {Object} req the reqsuest object
 * @param {Obejct} res the response object
 * @param {Function} next the callback Function 
 * @returns {Object} error 
 */


 const validateForgotPasswordForm = (req, res, next) => {
     const forgotPasswordSchema = Joi.object().keys({
         email: Joi.string()
                .required()
                .trim()
     })

     const errors = joiValidator(req.body, forgotPasswordSchema); 
     if(!errors) return next(); 
     return respondWithWarning(res, 400, 'Bad Input', errors)
 }


 /**
  * @param {Object} req the request object
  * @param {Object} res the response object
  * @param {Function} next the callback Function 
  * @returns {Object} error
  */

const validateNewPasswordForm = (req, res, next) => {
      const forgotPasswordSchema = Joi.object().keys({password: Joi.string().min(6).max(15).required()})

      const errors = joiValidator(req.body, forgotPasswordSchema)
      if(!errors) return next(); 
      return respondWithWarning(res, 400, 'Bad Input', errors)
  
}

module.exports = validateForgotPasswordForm, validateNewPasswordForm

