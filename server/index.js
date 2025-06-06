const express = require('express');
const cors = require('cors');
const connectDB=require('./configs/db')
const usersRouter = require('./routers/usersRouter');
const groupsRouter = require('./routers/groupsRouter');
const messagesRouter = require('./routers/messagesRouter');

const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const Message = require('./models/messagesModel');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


connectDB()
/* Middlewares */
app.use(cors());

app.use(express.json());
 // הגדרת תיקיית 'images' כציבורית
app.use('/images', express.static(path.join(__dirname, 'images')));

// require the routers
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/messages', messagesRouter);


wss.on('connection', (ws) => {
    console.log(' Client connected');

    ws.on('message', async (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            console.log(` Received message:`, parsedMessage);

            // שמירת ההודעה במסד הנתונים
            const newMessage = new Message({
                group: parsedMessage.group,
                user: parsedMessage.user,
                text: parsedMessage.text,
                date: new Date(),
            });
            await newMessage.save();

            // שליחת ההודעה לכל הלקוחות המחוברים
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newMessage));
                }
            });

        } catch (error) {
            console.error(' Error processing message:', error);
        }
    });
    

    ws.on('close', () => {
        console.log(' Client disconnected');
    });
});

//the server listen to port 8080
server.listen(8080, () => {
    console.log('🚀 Server is listen on http://localhost:8080');
});
