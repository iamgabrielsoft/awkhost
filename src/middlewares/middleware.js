
const {
    validUser, 
    authenticateUserToken, 
    verifyUniqueUserEmail, 
    verifyUniqueUsername, 
    authenticateForgotToken, 
    authenticateVerifyEmailToken } = require('./authentication')

const validateAdmin = require('./validateAdmin')
const AdminController = require('../controllers/AdminController')
const UsersController = require('../controllers/userController')
const CookieHandler = require('../middlewares/cookieHandler')
const { validateNewPasswordForm, validateForgotPasswordForm } = require('./validateResetPassword')

const { 
    checkIfSameUser, 
    checkUserPasswordReset, 
    validateUserByUsername, 
    validateByEmail, 
    validateUserById } = require('./validateUser')

const {validateUser, validateSingleParamId} = require('./validateUUID')
// const googleAuthentication = require('./googleAuth')
// const googleAuthCallBack = require('./googleAuth')

module.exports  = {
    AdminController, 
    UsersController,
    CookieHandler,
    // googleAuthentication, 
    // googleAuthCallBack, 
    validateAdmin ,
    validUser, 
    authenticateUserToken, 
    verifyUniqueUserEmail, 
    verifyUniqueUsername, 
    authenticateForgotToken, 
    authenticateVerifyEmailToken, 
    validateAdmin, 
    validateUser,
    validateSingleParamId, 
    validateNewPasswordForm, 
    validateForgotPasswordForm, 
    checkIfSameUser, 
    checkUserPasswordReset, 
    validateUserByUsername, 
    validateByEmail, 
    validateUserById
}