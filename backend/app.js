const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config({
    path : './database/config.env'
})

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        success : true,
        message : 'Server is working fine'
    })
})

module.exports = app