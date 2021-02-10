
const passport = require('passport')
const localStorage = require('local-storage')
const generateToken = require('../helpers/jwt');
const sanitizeUser = require('../helpers/sanitizeUser');


const githubAuthenticate = passport.authenticate('github', {scope: ['']}); 



const githubAuthCallback = (req, res, next) => passport.authenticate('github', async (err, user) => {
    if(!user) return res.redirect('signin'); 
    const sanitizedUser = sanitizeUser(user)
    const { userId, username, password, profileImg, isverified, } = sanitizeUser; 
    

    const payload = { userId};
    const token = generateToken(payload)
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(sanitizedUser)); 

    res.cookies.set('token', token, { signed: true }); // create token and send to client
    res.cookies.set('username', username, { signed: true });
    res.cookies.set('name', name, { signed: true });
    res.cookies.set('isAdmin', isAdmin, { signed: true });
    res.cookies.set('isVerified', isVerified, { signed: true });
    res.cookies.set('profileImage', profileImage, { signed: true });
    return res.redirect('/domain');
})(req, res, next);


module.exports = githubAuthCallback, githubAuthenticate