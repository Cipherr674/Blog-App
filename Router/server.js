const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken')

const Blog = require('../model/blogData');


function verifytoken(req,res,next){
    let token=req.headers.token; // we gave token to headers in the axios interceptor
    try {
        if(!token) throw 'Unauthorized acess';
        else{
            let payload=jwt.verify(token,'blogApp')
            if(!payload) throw 'Unauthorized acess';
            next();
        }
    } catch (error) {
        console.log(error)
    }
    
}

// so what we did here is that, we created a function called verifytoken then if the requested token is not matching it will throw unauthorized acess, if it matchches it goes into else
// then it verifies the token and !payload (same as above) and last it goes into the next, here the function (res) is not used and  when the next happens it uses the res of router.get,post etc



router.get('/', verifytoken, async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
});


router.post('/add', verifytoken, async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const blog = new Blog({ title, description, image });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: 'Error adding blog', error });
    }
});


router.put('/edit/:id', verifytoken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: 'Error updating blog', error });
    }
});


router.delete('/delete/:id', verifytoken,  async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
});

module.exports = router;
