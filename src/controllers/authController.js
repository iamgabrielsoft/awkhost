
const comparedPasswords  = require('../helpers/hash');
const respondWithSuccess = require('../helpers/responseHnadler');
const respondwithWarning = require('../helpers/responseHnadler')
const newUserVerificationEmail = require('../helpers/emailTemplate')
const sendMail = require('../services/emailServices')
const crypto = require('crypto')
const _ = require('lodash')
const generateToken = require('../helpers/jwt');
const passwordHash = require('../helpers/hash');


/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */


// User signup bro!
/**
 * @param req Express.Request
 * @param res Express.Response
 * @returns json body containing user data
 */


class UserAuth {
    constructor() {}
    async signin(req, res) {
        const { password } = req.body; 
        const comparePassword = await comparedPasswords(password, req.body.password); 
        if(!comparePassword) return respondwithWarning(res, 401, 'Incorrect Username and Password')

        const { userId, isAdmin } = req.user; 
        const payload = { userId, isAdmin }; 

        req.user.token = await generateToken(payload); 
        return respondWithSuccess(res, 200, 'Login Successfully', _.omit(req.user, ['password']))
    }

    createHash(email) {
        crypto.createHash('md5').update(email.trim()).digest('hex') 
    }

    hashPassword(password) {
        passwordHash(password)
    }

    async signup(req, res) {
        const {username, email, password} = req.body; 

        const _user = await createUser({
            username, 
            email, 
            password: this.hashPassword(password), 
        })

        if(_user.success) {
            const payload = {
                userId: _user.user.dataValues.userId,
                isAdmin: _user.user.dataValues.isAdmin 
            }

            const token = await generateToken(payload);
            _user.user.dataValues.token = token; 

            const mailBody = newUserVerificationEmail(req.user.name, SITE_URL, token, req.body.email)
            const sendEmail = sendMail(req.body.email, 'ITARJ - Verify Email', mailBody);
            return respondWithSuccess(res, 200, 'User Succefully Created', _.omit(_user.user.dataValues, ['Password']))
        }

        return respondWithWarning(res, 400, 'Error creating User :(');
    }
}


module.exports = UserAuth