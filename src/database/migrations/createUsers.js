
const uuid = require('uuid')
const moongoose = require('mongoose')
const query = moongoose.Query.prototype

const initQuery = query.setQuery('Users', {
    userId: {
        type:moongoose.Types._ObjectId, 
    }, 

    googleId: {
        type: moongoose.Types._ObjectId
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    isAdmin: {
        type: Boolean
    },

    isVerified: {
        type: Boolean, 
    },

    createdAt: {
        type: Date, 
        defaultValue: Date.now()
    }, 

    deletedAt: {
        type: Date,
        defaultValue: Date.now()
    }
})



moongoose.Query.prototype.exec((error, res) => {
    if(error) console.log('An Error Occured when settingQuery')
    else console.log('Your SetQuery', initQuery)
})