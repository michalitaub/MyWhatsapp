const express = require('express');
const usersService = require('../services/usersService');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage(); // שמירת הקובץ בזיכרון במקום בדיסק
const upload = multer({ storage });

const router = express.Router();

//Entry point //localost/users

router.post('/login', async (req, res) => {
    const { username, email } = req.body;

    // if 'username' and 'email' are exist in the DB
    const full_name = await usersService.findUserInUrlByUserNameAndEmail(username, email);
    
    console.log("full_name", full_name);
  
    if (full_name !== false ) {

        const userId = 'some_id';
        const SECRET_KEY = 'some_key';
        const token = jwt.sign(
            { id: userId },
            SECRET_KEY
            // { expiresIn: '1h' }
        );
        res.json({ token, full_name: full_name });
    } else {
        if (full_name === false) {
            res.status(401).json({ message: 'Invalid username or email' });
        } 
    }
});


//get all users
router.get('/', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const SECRET_KEY = 'some_key';
    jwt.verify(token, SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        try {
            const filter = req.query;
            const users = await usersService.getAllUsers(filter);
          
            res.json(users);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//get user by id with token
router.get('/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const SECRET_KEY = 'some_key';
    jwt.verify(token, SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        try {
            const { id } = req.params;
            const user = await usersService.getByID(id);
            res.json(user);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//add user with token
router.post('/', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const SECRET_KEY = 'some_key';
    jwt.verify(token, SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        try {
            const user = req.body;
            const newUser = await usersService.addUser(user);
           
            res.json(newUser);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
     });
});

//update user with token
router.put('/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const SECRET_KEY = 'some_key';
    jwt.verify(token, SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        try {
            const { id } = req.params;
            const user = req.body;
            console.log(user);
            const updatedUser = await usersService.updateUser(id, user);
            res.json(updatedUser);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});
//upload image
router.post('/uploadImage/:id', upload.single('myFile'), async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const updatedUser = await usersService.uploadImage(id, req.file.buffer); // שולחים את הקובץ כ-Buffer
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
