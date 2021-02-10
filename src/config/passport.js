
const passport = require('passport')
const Google = require('passport-google-oauth20')
const Github = require('passport-github')
const randomstring = require('randomstring')
const passwordHash = require('../helpers/hash')
const googleConfig = require('./socialAuth')
const githubConfig = require('./socialAuth')
const User = require('../models/Users')
const createUser = require('../services/userServices')
const updateOneUser = require('../services/userServices')
const findSingleUser = require('../services/userServices')
const { x } = require('joi')


const GoogleStrategy = Google.Strategy; 
const GithubStrategy = Github.Strategy; 

//module.exports 
passport.serializeUser((user, done) => {
    done(null, user.id); 
})


//deserialized the user 
passport.deserializeUser((id, done) => {
    User.findUsers(id, (err, user) => {
        done(err, user); 
    }) 
})



//Google Authentication
passport.use(new GoogleStrategy(googleConfig, async (accessToken, refreshToken, profile, done) => {
    try {
       const {sub, name, email} = profile._json; 
       const username = name.replace(/\s/g, '').toLowerCase(); // Create username by joining name string
       const user = await findSingleUser({ email }); 
       const password = await passwordHash(accessToken); 
       const usernameTaken = await findSingleUser({ username: screen_name });


       //creating a user if it does not exist 
       if(!user) {
        const newData = {}; 
        newData.username = username; 
        newData.password = password; 
        newData.email = email; 
        newData.isVerfied = true; 
        newData.googleId = sub;  

        if(usernameTaken) newData.username + randomstring.generate({length: 7, charset: 'numeric'}); 
        else newData.username = username; 
       }
       

       const newUser = await createUser(newData); 
       done(null, newUser.user); 

       if(user && !user.googleId) {
           const { userId } = user; 
           const updateuser = await updateOneUser({ googleId: sub}, { userId})
            .catch((err) => { 
                throw err
            })

            // Return user if user exists
           return done(null, updateuser); 
       }

    } catch (error) {
        return done(error)
    }
}))




//Github Authentication
passport.use(new GithubStrategy(githubConfig, async (token, refreshToken, profile, done) => {
    try {
        const { id, username, screen_name, email, profileImg } = profile._json;
        const user = await findSingleUser({ githubId: id });
        const password = await passwordHash(token);
        const usernameTaken = await findSingleUser({ username: screen_name });



        // Create new user if not exists
        if (!user) {
          const newData = {};
          newData.username = username;
          newData.githubId = githubId;
          newData.email = email;
          newData.password = password;
          newData.profileImg = profileImg;
          newData.isVerified = true;

          if (usernameTaken) {
            newData.username = screen_name + randomstring.generate({ length: 7, charset: 'numeric' });
          } else newData.username = screen_name;
          
          const newUser = await createUser(newData);
          console.log(newUser)
          return done(null, newUser.user);

        }

        // Add user's googleId if it doesn't exist already
        if (user && !user.twitterId) {
          const { userId } = user;
          const updatedUser = await updateOneUser({ githubId: id }, { userId }).catch(e => {
            throw e;
          });
          return done(null, updatedUser);
        }
        // Return user if user exists
        return done(null, user);
      } catch (err) {
        return done(err);
      }

    
}))