const express = require('express');
const color = require('colors');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewear/errorMiddlewear');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

const app = express();
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use('/api/comments', require('./routes/commentRoutes.js'))
app.use('/api/users', require('./routes/userRoutes.js'))
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server ${port}`)
})