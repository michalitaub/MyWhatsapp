const express=require('express');
const messagesService = require('../services/messagesService');
const jwt=require('jsonwebtoken');

const router = express.Router();

//Entry point //localost/massages
//get all massages
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
            const messages = await messagesService.getAllMessages(filter);
            res.json(messages);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});
//get message of group
router.get('/group/:id', async (req, res) => {
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
            const messages = await messagesService.getByGroup(id);
            res.json(messages);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//get message by id with token
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
            const message = await messagesService.getByID(id);
            res.json(message);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//add message
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
            const message = req.body;
            const newMessage = await messagesService.addMessage(message);
            res.json(newMessage);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

//update message
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
            const message = req.body;
            const updatedMessage = await messagesService.updateMessage(id, message);
            res.json(updatedMessage);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});
//delete message
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
            const message = await messagesService.deleteMessage(id);
            res.json(message);
        } catch (error) {
            res.json(error); // בדיקת שגיאות
        }
    });
});

module.exports = router;