const http = require('http')
const path = require('path')
var express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express(); 
const PORT = 5000 || process.env


app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(expressLayouts)
app.use(bodyParser({ extended: true}))


const server = http.createServer(app)

app.use('/', require('./routes/homepageRouter'))
app.use('/signup', require('./routes/auth/signupRouter'))



var url = `mongodb://localhost:27017` //mongodb
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database Connected!')
    })
    .catch((err) => {
        console.log('Not Connected', err)
    })



app.use(
    session({
        secret: 'dana123', 
        resave: true, 
        saveUninitialized: true, 
        })
)


server.listen(PORT, () => {
    console.log(`Listening at https://localhost${PORT}`)
})



module.exports = express