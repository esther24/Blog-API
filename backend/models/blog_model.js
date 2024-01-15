const mongoose = require("mongoose");

const Schema = mongoose.Schema

const blogSchema =  new Schema({

    // create id to connect with the author --- easy search -- objid ref:user check your minipro
    title: {
        type: String,
        required: [true, "Your Blog Post must have a title"],
        trim: true,
        required: true,
        maxlength:20,
        unique : true
    },

    description: {
        type: String,
        required: [true, "Your Blog Post must have a description"],
    },
    
    body: {
        type: String,
        required: [true, "A Blog Post must contain a body"],
    },

    author: {
        type: String,
        required: true,
        trim: true,
        required: true,
        maxlength:15,
        unique : true
    }
},{timestamps:true}) //second argu timestamp


module.exports = mongoose.model("Blog",blogSchema);