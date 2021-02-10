
const path = require('path')
const passport = require('passport')
const passportSetup = require('./config/passport')
var express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const Keygrip = require('keygrip');
const Cookies = require('cookies')   
const SECRET_KEY = require('./config/constants')
const { NODE_ENV, MONGO_URL} = require('./config/constants')
 

const app = express(); 
const keys = Keygrip([SECRET_KEY])
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: true 
})
    .then(() => {
        console.log('Database Connected!')
    })
    .catch((err) => {
        console.log('Not Connected', err)
    })



app.use(session({
    secret: SECRET_KEY, 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: true}
}))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT DELETE, PATCH, OPTIONS' )
    next()
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'))

app.use(Cookies.express(keys))
app.use('/', require('./routes/routes'))
app.use(passport.initialize())
app.use(passport.session()); 



app.set('view engine', 'ejs') //setting ejs as the templating engine
app.set('views', path.join(__dirname, 'views')) //getting the views file
app.use(express.static(path.join(__dirname, '../public'))); // load local css and js files
app.use(express.static(path.join(__dirname, './views/pageScripts')))
app.use(bodyParser({ extended: true}))



const PORT = 5000 || process.env; 
app.listen(PORT, () => {
    console.log(`Listening at https://127.0.0.1:${PORT}`)
})



module.exports = express