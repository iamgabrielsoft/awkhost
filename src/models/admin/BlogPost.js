
const moongoose = require('mongoose')


const BlogPostSchema = moongoose.Schema({
    title: String, 
    author: String, 
    body: String, 
    img: {
        data: Buffer, 
        contentType: String
    }

})


module.exports = moongoose.model('BlogPost', BlogPostSchema)