
const sanitizeUser = require('../helpers/sanitizeUser')
const googleSignup = require('../middlewares/validAuth')
const generateToken = require('../helpers/jwt')
const passport = require('passport')
const localStorage = require('local-storage')


const googleAuthentication = passport.authenticate('google', { scope: ['profile', 'email']})


///////////////////////////////////////////////////////////////////////////////
const googleAuthCallBack = (req, res, next) => passport.authenticate('google', async (err, user) => {
    if(!user) return res.redirect('signup'); 

    const sanitizedUser = sanitizeUser(user); //remove password from user
    const { userId, username, password, isVerified} = sanitizedUser; 
    const payload = { username, userId, isAdmin, password, isVerified};
    const token = await generateToken(payload); 

    const googleUser = googleSignup(user); 


    localStorage.setItem('token', token); //set token to localstorage
    localStorage.setItem('user', JSON.stringify(sanitizedUser));
    localStorage.setItem('user', JSON.stringify(googleUser)); //from google signup api 

    res.cookies.set('token', token, { signed: true}) //created the token to be sent to the client
    res.cookies.set('username', username, { signed: true})
    res.cookies.set('isAdmin', isAdmin, {signed: true })
    res.cookies.set('isVerified', isVerfied, { signed: true}); 
    return res.redirect('layout'); 

})(req, res, next)



module.exports = googleAuthentication, googleAuthCallBack