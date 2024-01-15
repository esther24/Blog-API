const blog_model = require("../models/blog_model")
const blog = require("../models/blog_model")
const mongoose = require("mongoose")


//get all blogs
const allBlogs = async(req,res) =>{
    const blogs = await blog.find({}).sort({createdAt: -1})
    res.status(200).json(blogs)
} // sending 200 ok res with json data through blogs that is found


//create blog
const createBlog = async (req,res)=>{
    const {title, description, body, author} = req.body
    let emptyFeilds = []

    if(!title){
        emptyFeilds.push('title')
    }
    if(!description){
        emptyFeilds.push('description')
    }
    if(!body){
        emptyFeilds.push('body')
    }
    if(!author){
        emptyFeilds.push('author')
    }
    if(emptyFeilds.length > 0){
        return res.status(400).json({error: "Please fill in all fields!", emptyFeilds})
    }

    //add doc to db
    try {
        const blog = await blog_model.create({title, description, body, author }) //async method
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error: error.message}) //error msg send the error recieved
    }
}

//get a single blog
const getOneBlog = async (req,res) =>{
    const { id } = req.params;
    //checking if id is valid mongo/mongoose type
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog found!"})
    } ;
    //this above if helps us to make sure that there is no internal error rather the error is displayed neatly
    
    const blog = await blog_model.findById(id)
    if (!blog){
        return res.status(404).json({error: "no such blog!!"})
    }//if not found
//if found
    res.status(200).json(blog)
}

//update blog
const updateBlog = async (req,res) =>{
    const {id} = req.params 
//checking validity of id
    if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such blog found!"})
    } ;

    const blog = await blog_model.findByIdAndUpdate({_id:id},{
       ...req.body //spreading req body data
    })

    if (!blog){
        return res.status(404).json({error: "no such blog!!"})
    }//if not found
//if found
    res.status(200).json(blog)

}

//delete blog
const delBlog = async (req,res) =>{
const {id} = req.params 
//checking validity of id
if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such blog found!"})
} ;

const blog = await blog_model.findByIdAndDelete({_id:id})
if (!blog){
    return res.status(404).json({error:"No such blog found!"})
}
res.status(200).json(blog)
}

module.exports = {createBlog, getOneBlog, allBlogs,delBlog,updateBlog}