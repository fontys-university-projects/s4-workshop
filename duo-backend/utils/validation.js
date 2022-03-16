const validator = require('validator')
const createError = require('http-errors')

const userPasswordSecurity = parseInt(process.env.USER_PASSWORD)
module.exports = {
    verifyEmail(email) {
        const verify = validator.isEmail(email)
        if(verify == false){
            return(createError.Unauthorized('Email is not valid'))
        }
        return(verify)
    },
    verifyDate(date) {
        const verify = validator.isDate(date, {format:'YYYY-MM-DD', strictMode:true})
        if(verify == false){
            return(createError.Unauthorized('Birthday is not valid'))
        }
        return(verify)
    }
}