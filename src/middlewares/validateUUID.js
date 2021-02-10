
const Joi = require('@hapi/joi')
const joiValidator = require('../helpers/joiValidator')
const respondWithWarning = require('../helpers/responseHnadler')
const Valid_UUID = require('../config/constants')

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */

 const validateUser = (req, res, next) => {
     const schema = Joi.object().keys({
         userId : Joi.string()
                 .pattern(Valid_UUID)
                 .required()
     })

     const error = joiValidator(req.params, schema)

     if(!error) return next(); 
     return respondWithWarning(res, 400, 'Bad Request', error)
 }

 const validateSingleParamId = (key, req, res, next) => {
     const schema = Joi.object().keys({
         [key]: Joi.object()
                 .pattern(Valid_UUID)
                 .required
     })

     const error = joiValidator(req.params, schema); 
     if(!error) return next(); 
     return respondWithWarning(res, 400, 'Bad request', error); 
 }



 module.exports = { validateUser, validateSingleParamId }