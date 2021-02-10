

const {
    DEV_DATABASE_URL, 
    TEST_DATABASE_URL,
    PROD_DATABASE_URL
    } = require('../config/constants'); 



module.exports = {
    development: {
        use_env_variable: true, 
        url: DEV_DATABASE_URL, 
        dialect: 'mongodb'
    }, 

    test: {
        use_env_variable: true, 
        url: TEST_DATABASE_URL, 
        dialect: 'mongodb'
    }, 

    production: {
        use_env_variable: true, 
        url: PROD_DATABASE_URL, 
        dialect: 'mongodb'
    }
}
