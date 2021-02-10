
/**
 * Handles all http responses
 * @exports respondWithSuccess
 * @exports respondWithWarning
 */

/**
 * @param  {Object} res
 * @param  {Number} statusCode
 * @param  {String} message
 * @param {Object} additionalFields
 * @returns {Object} null
 */


//follow my lead = Mr. P ft Wande Coal 

const respondWithSuccess = (res, statuCode = 200, message, additionalFields = {}) => {
    //respond to the user with a response request 
    const payload = Array.isArray(additionalFields) ? [...additionalFields]: { ...additionalFields };
    return res.status(statuCode).send({   
        success: true, 
        message,  
        payload
    })
}
     

const respondWithWarning = (res, statusCode = 500, message, additionalFields = {}) => {
     //respond to the user with a response warning
    const payload = Array.isArray(additionalFields)  ? [...additionalFields]  : { ...additionalFields };
    return res.status(statusCode).send({
        success: false, 
        message,    
        payload
    })
}

module.exports = respondWithSuccess, respondWithWarning