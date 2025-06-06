const express = require('express');
const jwt = require('jsonwebtoken');
const groupsService = require('../services/groupsService');
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage(); // שמירת הקובץ בזיכרון במקום בדיסק
const upload = multer({ storage });

const router = express.Router();
//Entry point //localost/groups
//get all groups
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
            const groups = await groupsService.getAllGroups(filter);
            res.json(groups);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Internal Server Error' }); // בדיקת שגיאות
        }
    });
});

//get group by id with token
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
            const group = await groupsService.getByID(id);
            res.json(group);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//get groups by user id if he is member of them and this not chat with token
router.get('/user/:id', async (req, res) => {
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
            const groups = await groupsService.getByUserID(id);
            
            res.json(groups);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//request to get group chat with tow id users
router.get('/chat/:id1/:id2', async (req, res) => {

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
            const { id1, id2 } = req.params;
            
            const group = await groupsService.getGroupChat(id1, id2);
          
            res.json(group);
        } catch (error) {
           
            res.json(error); // בדיקת שגיאות
        }
    });
    })

//add chat group with token
router.post('/chat', async (req, res) => {
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
                
                const group = req.body;
                
                const newGroup = await groupsService.addChatGroup(group);
                 console.log(newGroup)
                res.json(newGroup);
            } catch (error) {
                res.status(500).json({ error: error.message || 'Internal Server Error' }); 
            }
    })});

    //add group with token
    router.post('/', upload.single('myFile') ,async (req, res) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const SECRET_KEY = 'some_key';
        jwt.verify(token, SECRET_KEY, async (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to authenticate token' });
            }
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            try {
                
                const group = req.body;
               
                const newGroup = await groupsService.addGroup(group, req.file.buffer);
              
                res.json(newGroup);
            } catch (error) {
                res.json(error); 
            }
        });
    });

    //update group with token
    router.put('/', upload.single('myFile'), async (req, res) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const SECRET_KEY = 'some_key';
        jwt.verify(token, SECRET_KEY, async (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to authenticate token' });
            }
           
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            try {
                // const { id } = req.params;
                const group = req.body;
              console.log("id", group._id)
                const updatedGroup = await groupsService.updateGroups(group._id, group, req.file.buffer);
                res.json(updatedGroup);
            } catch (error) {
                res.json(error); // בדיקת שגיאות
            }
        });
    });

    //delete group with token
    router.delete('/:id', async (req, res) => {
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
                const group = await groupsService.deleteGroups(id);
                res.json(group);
            } catch (error) {
                res.json(error); // בדיקת שגיאות
            }
        });
    });
    module.exports = router;


