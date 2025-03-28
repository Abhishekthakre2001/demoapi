const express = require('express');
<<<<<<< Updated upstream
const dotenv = require("dotenv");
var cors = require('cors');
const UserRoutes = require("./Routes/User.js");
const superadminRoutes = require("./Routes/SuperAdmin.js");
const AdminRoutes = require('./Routes/AdminRoutes.js')
=======
const cors = require('cors');
const superadmin = require('./routes/SuperAdmin');
const admin = require('./routes/AdminRoutes');
const user = require('./routes/User');
const call = require('./routes/call');
const { createServer } = require('http');
const { Server } = require('socket.io');
>>>>>>> Stashed changes


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Socket connections by user ID
const userSockets = {};

// Set up Socket.IO
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // User registers their UID with the socket
    socket.on('register', (data) => {
        const { uid, channelName, isAdmin } = data;
        console.log(`User ${uid} (${isAdmin ? 'Admin' : 'Member'}) registered for channel ${channelName}`);
        userSockets[uid] = socket.id;

        // Join a room named after the channel
        socket.join(channelName);

        // If a team member is joining, notify everyone in the channel
        if (!isAdmin) {
            io.to(channelName).emit('member-joined', {
                uid: uid,
                timestamp: Date.now()
            });
        }
    });

    // Handle admin leaving (ending the meeting)
    socket.on('admin-left', (data) => {
        const { channelName } = data;
        io.to(channelName).emit('meeting-ended', {
            message: 'The admin has ended the meeting',
            timestamp: Date.now()
        });
    });

    socket.on('disconnect', () => {
        // Remove socket mapping when user disconnects
        for (const uid in userSockets) {
            if (userSockets[uid] === socket.id) {
                delete userSockets[uid];
                break;
            }
        }
    });
});



app.use(cors());

<<<<<<< Updated upstream
app.use('/user', UserRoutes);
app.use('/superadmin', superadminRoutes);
app.use('/admin', AdminRoutes);

=======
app.use(express.json());
>>>>>>> Stashed changes


app.use('/v1/superadmin', superadmin);
app.use('/v1/admin', admin);
app.use('/v1/call', call);
app.use('/v1/user', user);

// app.use('/v1/user', user);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server started on http://localhost:3000`);
});

module.exports = { app, io };