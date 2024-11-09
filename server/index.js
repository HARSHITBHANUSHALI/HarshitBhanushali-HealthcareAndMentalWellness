require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500;
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const ROLES_LIST = require('./config/roles_list');
const verifyRoles = require('./middleware/verifyRoles');
const { Server } = require('socket.io');
// const chatRoom = require('./webSockets/chatRoom')

connectDB();

app.use(credentials)

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());

app.use('/',express.static(path.join(__dirname,'/public')));

// app.use('/call',require('./routes/callRoute'));

// app.use('/message',require('./routes/messageRoute'));

app.use('/auth', require('./routes/authRoutes'));

app.use(verifyJWT);

const expressServer = app.listen(PORT,()=>console.log(`Server running on Port ${PORT}`));

const io = new Server(expressServer, {
    cors: {
        credentials: true,
        origin: corsOptions
    }
});

// chatRoom(io);