const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        unique:true,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    image:{
        type : String,
        required:true
    },
    role:{
        type: String,
        default : 'admin'
    }
})

module.exports = model('users', userSchema)