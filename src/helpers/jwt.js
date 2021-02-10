
const jwt = require('jsonwebtoken')
const { EXPIRATION_DURATION, SECRET_KEY } = require('../config/constants')

/**
 * Function to generate token from userId and role
 * @param {object} data
 * @param {object} options
 * @returns {string} generated token
 */


 const generateToken = async (data, options = {expiresIn: EXPIRATION_DURATION}) => {
     const token = jwt.sign( {key: data}, SECRET_KEY, options); 
     return token
 }

 /**
 * Function to generate password reset token from userId
 * @param {object} data
 * @param {object} options
 * @returns {string} generated token
 */


const generateResetToken = async (data, options) => {
     const token = await jwt.sign({key: data}, SECRET_KEY, options); 
     return token;
}


/**
 * Verify a token
 * @param {object} token
 * @returns {Object} decoded data
 */

 const veryToken = (token) => jwt.verify(token, SECRET_KEY); 

 
/**
   * Verify a token
   * @param {object} token
   * @returns {Object} decoded data
   */

const formatJWTErrorMessage = (message) => {
    var formatMessage; 
    if(message.includes('invalid') || message.includes('malformed')) return formatMessage = 'Session is Invalid. Signing to Continue'; 
    if(message.includes('expired')) return formatMessage = 'Session has Expired. Signing Continue'; 

    return formatMessage; 
} 

module.exports = generateToken, generateResetToken, formatJWTErrorMessage, veryToken



/*class ResetToken{
    constructor(userMail) {
        this.userMail = userMail
    }


    generateToken(data, options = {expiresIn: EXPIRATION_DURATION}) {
        const token = jwt.sign( {key: data}, SECRET_KEY, options); 
        return token; 
    }

    async generateResetToken(data, options) {
        const token = await jwt.sign({key: data}, SECRET_KEY, options); 
        return token;
    }

    verify(token) {
        jwt.verify(token, SECRET_KEY)
    }


    formatJWTErrorMessage(message) {
        var formatMessage; 
        if(message.includes('invalid') || message.includes('malformed')) return formatMessage = 'Session is Invalid. Signing to Continue'; 
        if(message.includes('expired')) return formatMessage = 'Session has Expired. Signing Continue'; 
        return formatMessage; 
    }
}*/



