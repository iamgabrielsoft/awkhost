
// const GOOGLE_CLIENT_ID = require('./constants')
// const GOOGLE_CLIENT_SECRET = require('./constants')
const SITE_URL = require('./constants')



const googleConfig = {
    clientID: `166179458691-6stsullfmt8s1e0ff3rtno64gu1mvfci.apps.googleusercontent.com`,
    clientSecret: `037CFsLsf-szc0fOLE4ON5kw`,
    // callback: `http://localhost:5000/auth/google/redirect` 
}



const githubConfig = {
    clientID: `9043dfc124f767efa8df`, 
    clientSecret: `d01fd4f6e845085963ca0de50e8910ad6db0f5b1`, 
    callback: `http://localhost:5000/auth/github/redirect`, 
}



module.exports = googleConfig, githubConfig