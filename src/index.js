// Node core modules
const path = require('path')

// Path management
const staticDirPath = path.join(__dirname, '../public')

// Setting up Express server
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Configure static content
app.use(express.static(staticDirPath))

// Server start-up
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})