const express = require("express");
const  {loginUser , signupUser  } = require("../controllers/user");

const router = express.Router();

//login => path, req handler fun
router.post('/login', loginUser)

//signup
router.post('/signup', signupUser)

// //signout
// router.get('/signout',signOut)



module.exports = router