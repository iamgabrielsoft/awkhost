const { Model } = require('mongoose');
const BlogPost = require('../models/admin/BlogPost')
const Users = require('../models/Users')


 /**
 * Used to create a new record in the Users Documents
 *
 * @param {object} userData: username, name, email, password
 * @returns {object} {success: Boolean, user: any | error: any}
 */

 const createUser = async (userData) => {
     try {
        const user = await Users.create(userData)
        console.log(user)

        
        return { success: true, user}
 
     } catch (err) {
        console.log(`${err.name}: ${err}`)
        return {success: false, err} 
     }
 }

 
 const dt = {username: 'gabriel'}
 
 console.log(createUser(dt))


 /*** return a single user */

const findSingleUser = async (queryOption = {}) => {
    try {
        const user = await Users.findOne({
            $where: queryOption, 
            logging: false
        })

        console.log(user)
        return user

    } catch (err) {
        console.log(err)
    }
}


const fetchSingleUser = async (query) => {
    const user = await Users.findOne({
        include: [{model: BlogPost, as: 'BlogPost'}], 
        $where: query, 
        logging: false, 
    })

    if(user) return user = user.dataValues; 
}


/**
 * Get all users
 * @returns {object} an object containing the information of the user or null
 */

const findUsers = async (queryOption = {}) => {
    try {
        const user = await Users.find({     }); //logging: false 
        return user; 

    } catch (err) {
        console.log(err); 

    }
}


const updateOneUser = async (data, queryOption) => {
    try {
        const user =  await Users.updateOne({...data}, {
            $where: queryOption, 
            returning: true, 
            logging: false
        })

        .then(() => Users.findOne({$where: queryOption}))
        .catch((updatedUser) => updatedUser); 
        return user; 

    } catch (err) {
        console.log(err)
    }
}


 module.exports = createUser, fetchSingleUser, findUsers, findSingleUser, updateOneUser