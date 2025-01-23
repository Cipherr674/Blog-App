const express = require('express');
const userRouter = express.Router();
const User = require('../model/Userdata'); // Ensure the path is correct for your project structure
const jwt=require('jsonwebtoken')


// Fetch all users
userRouter.get('/data', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


//LOGIN API
userRouter.post('/login', async (req, res) => {
    try {
        // Check if the user exists in the database
        const user1 = await User.findOne({ Email: req.body.Email });

        // If no user is found, send an appropriate response and return
        if (!user1) {
            
            return res.status(404).send({ message: 'User not found' });
        }

        // Compare the password
        if (user1.Password === req.body.Password) {
            const payload={email:user1,password:user1.password};
            const token=jwt.sign(payload,'blogApp'); // Generating a token, then go to login .jsx
            return res.status(200).send({ message: 'Login Successful',token:token});
        } else {
            return res.status(401).send({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: 'Internal Server Error', error });
    }
});


// Add a new user
userRouter.post('/add', async (req, res) => {
    try {
        const { Name, Email, Password, Number, Address } = req.body; // Adjust fields as per your User model
        const newUser = new User({Name, Email, Password, Number, Address });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error });
    }
});

// Update a user by ID
userRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});

// Delete a user by ID
userRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = userRouter;
