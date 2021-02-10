
const Joi  = require('@hapi/joi')

/**
 * @param {Object} data
 * @param {Joi.Schema} schema
 * @param {Function} next
 * @returns {Function} next middleware
 */

 const joiValidator = (data, schema) => {
     let message; 
     
     const validationOption = {
         allowUnkown: true, // allow unknown keys that will be ignored
         stripeUnkown: true, // remove unknown keys from the validated data
         abortEarly: true   // validate all inputs befor flagging error
     }

     const { error, value} = schema.validate(data, validationOption); 
     if(error) return message = error.details.map(items => items.message.replace(/['"]/g, ''));
     return message;
 }


 module.exports = joiValidator