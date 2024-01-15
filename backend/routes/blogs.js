const express = require("express");
const Blog_model = require("../models/blog_model")
const {createBlog,allBlogs,getOneBlog,delBlog,updateBlog} = require("../controllers/blog")
const router = express.Router();


//GET ALL BLOGS
router.get('/allblogs', allBlogs);

//GET SINGLE BLOG VIA ID
router.get('/allblogs/:id', getOneBlog);

//POST A NEW BLOG
router.post('/blog',createBlog);

//UPDATE AN EXISTING BLOG
router.patch('/blogs/:id',updateBlog);

//DELETE A BLOG
router.delete('/blogs/:id',delBlog);
            


module.exports = router;