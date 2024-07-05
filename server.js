
const express = require('express');
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbConnection')

require('dotenv').config();

connectDB()
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/contacts",require("./router/contactRouter"))
app.use("/api/users",require("./router/userRouter.js"))
app.use(errorHandler);

app.listen(PORT,( )=>{
    console.log('Server is running on: http://localhost:'+ PORT);
})  