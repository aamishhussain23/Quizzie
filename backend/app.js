const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoute')
const {errorMiddleware} = require('./utils/ErrorHandler')
const cookieParser = require('cookie-parser')
const app = express()

dotenv.config({
    path : './database/config.env'
})

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({
        success : true,
        message : 'Server is working fine'
    })
})

app.use('/api/v1/user', userRoutes)


app.use(errorMiddleware)
module.exports = app