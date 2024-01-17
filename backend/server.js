const app = require("./app")
const connectDB = require('./database/database')

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})