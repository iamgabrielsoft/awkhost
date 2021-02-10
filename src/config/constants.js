const dotenv = require('dotenv')
dotenv.config()


const prog = {
    SALT_ROUNDS, 
    PORT, 
    SECRET_KEY,
    EMAIL_ADDR,
    EMAIL_PASSWORD,
    SENDER_ADDR, 
    SITE_URL, 
    // GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET, 
} = process.env 


var MONGO_URL = "mongodb+srv://iamgabrielsoft:Germany@awkhostappllc.dghhk.mongodb.net/<dbname>?retryWrites=true&w=majority";

const EXPIRATION_DURATION = 172800;
const VALID_UUID = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
   
  

module.exports = {
    prog,    
    EXPIRATION_DURATION, 
    VALID_UUID, 
    MONGO_URL
}  