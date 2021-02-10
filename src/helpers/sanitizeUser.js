

const sanitizeUser = (user) => {
    const { dataValues } = user; 
    return {...dataValues, password: null}
}



module.exports = sanitizeUser; 