
const moongoose = require('mongoose')
const passwordHash = require('../../helpers/hash')

moongoose.Model.insertMany('Users', [
    {
        userId: , 
        username: 'admin', 
        email: 'admin@awkhost.com', 
        password: passwordHash('12345'), 
        isAdmin: true
    }, 

    {
        userId: , 
        username: 'John Doe', 
        email: 'johndoe@gmail.com', 
        password: await passwordHash('4444'), 
        isAdmin: false
    }, 

    {
        userId: , 
        username: 'Gabriel soft', 
        email: 'iamgabrielsoft@gmail.com', 
        password: passwordHash('2222'), 
        isAdmin: false 
    }
], {})


