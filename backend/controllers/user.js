const User = require('../models/user_model');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    //id part of payload
    //creating token with argu : id, secret and put expire
    //the token is payload secret and headers encoded and bunched together
    return jwt.sign({_id}, process.env.SECRET , {expiresIn: '1d'}) //always return your jwt.sign
}

//login 
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token}) //passing token to the browser
    }catch (error){
        res.status(400).json({error: error.message})
    }

    //res.json({msg:"hello user login"})
}

//signup
const signupUser = async (req,res) => {
    //{ } because we destructing from an object
    const {username , email, password} = req.body 

    try{
        const user = await User.signup(username,email,password)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token}) //passing token to the browser
        res.cookie('usertoken', token, { expire: new Date() + 9999 });
    }catch (error){
        res.status(400).json({error: error.message})
    }

    //res.json({msg:"hello user signup"})
}

// //signout
// const signOut = async (req,res) => {
//     res.clearCookie('usertoken');
//     res.json({message: "Signed out successfully!"});
//     // res.json({msg:"hello user signout"})
// }

module.exports = {loginUser,signupUser}