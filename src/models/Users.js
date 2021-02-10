
const moongoose = require('mongoose')
const uuid = require('uuid')



const UserSchema = new moongoose.Schema({
    userId: {
        type: moongoose.Schema.Types.ObjectId, 
        // default: uuid.v4(), 
    }, 

    GoogleId: { type: String}, 
    GithubId: {type: String}, 

    Username: {
        type: String, 
        required: true, 
    }, 

    password: {
        type: String, 
        required: true, 
        default: false
    }, 

    isPasswordReset: {
        type: Boolean,
        default: false  
    },

    isVerified: {
        type: Boolean, 
        default: false 
    }
}, {})



module.exports = moongoose.model('User', UserSchema)