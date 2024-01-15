const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema =  new Schema({

    //username will e author name
    username: {
        type: String,
        required: true,
        unique: true
    },

    email : {
        type: String,
        require: true,
        unique: true, //unique emails as in no same email or author on it
    },

    password : {
        type: String,
        require: true,
    }
    
},{timestamps:true}) //second argu timestamp

//static signup method
userSchema.statics.signup = async function(username,email,password) {
//validation
    if(!username || !email || !password ) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)) {
        throw Error("Email should be valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong!")
    }

    if(!validator.isLength(username , {min:2 , max:10})){
        throw Error("Username should be min 2 or max 10 characters!")
    }

    //user posts data so that data check and hashing
    const emailExists = await this.findOne({email})
    const userExists = await this.findOne({username})
    if(emailExists || userExists) {
        throw Error("Email or Username is in use already")
    }
// 10 the cost of the salt aka rounds of salt length i think
    const salt = await bcrypt.genSalt(10) //await cause it takes time to complete
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({username, email, password: hash })  //refs the model => this

    return user
}

//static login method
userSchema.statics.login = async function(email,password){
    if(!email || !password ) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if (!user){
        throw Error("Email incorrect!")
    }

    const match = await bcrypt.compare(password, user.password)
    
    if(!match){
        throw Error('Incorrect Password!')
    }

    return user

}





module.exports = mongoose.model("User",userSchema);