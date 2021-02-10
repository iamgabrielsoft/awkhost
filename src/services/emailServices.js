
const nodemailer = require('nodemailer')
const { EMAIL_ADDR, EMAIL_PASSWORD, SENDER_ADDR} = require('../config/constants')


const sendMail = async (recipientAddr, title, messageBody) => {
    var success; 
    
    const transporter = nodemailer.createTransport({
        service: 'Mailjet', 
        auth: {
            user: EMAIL_ADDR, 
            pass: EMAIL_PASSWORD, 
        }
    })

    const mailOption = {from: `ITAG Notification ${SENDER_ADDR}`, to: recipientAddr, subject: title, html: messageBody};   //the body is carying am html text

    const info = await transporter.sendMail(mailOption)
        .then((mail) => {
            console.log(`Email sent: ${info.response}, ${mail}`);
            success = true;
        })
        .catch((err) => {
            console.log('error in transporter.sendMail(mailOptions)');
            success = false;
        })
        
        
    return success; 
}


module.exports = sendMail