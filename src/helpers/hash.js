
const bcrypt = require('bcrypt'); 
const SALT_ROUNDS = require('../config/constants')

/**
 * @param  {String} password
 * @returns {String} hashed password
 */

 
const passwordHash = async password => bcrypt.hash(password, Number(SALT_ROUNDS))
const comparedPasswords = async (userPass, hashedPass) => bcrypt.compare(userPass, hashedPass); 
/**
 * @param  {String} userPass
 * @param  {String} hashedPass
 * @returns {Boolean} boolean
 */



module.exports = passwordHash, comparedPasswords