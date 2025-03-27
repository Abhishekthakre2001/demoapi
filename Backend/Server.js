const express = require('express');
const dotenv = require("dotenv");
var cors = require('cors');
const UserRoutes = require("./Routes/User.js");
const superadminRoutes = require("./Routes/SuperAdmin.js");
const AdminRoutes = require('./Routes/AdminRoutes.js')

dotenv.config();

const PORT = process.env.PORT
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(express.json()); // This is required to parse JSON request bodies

app.use('/user', UserRoutes);
app.use('/superadmin', superadminRoutes);
app.use('/admin', AdminRoutes);



app.listen(PORT, () => console.log(`server is running on ${PORT}`))