const moongoose = require('mongoose')

const PaymentGateway = new moongoose.Schema({
    SubcriptionPlan: {
        id: Number, 
    }
})