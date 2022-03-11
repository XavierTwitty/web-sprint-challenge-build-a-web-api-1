const express = require('express');
const cors = require('cors')
const server = express();
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')
// Configure your server here
server.use(cors())
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
server.use('/api/actions', actionRouter)

// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h2> WELCOME!!!!!! </h2>`)
})

server.use('*', ( req , res ) => {
    res.status(404).json({message:`${req.method} ${req.baseUrl}`})
})


server.use((err , req , res , next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        custom: "error", 
        message: err.message, 
        stack: err.stack
    })
})



module.exports = server;
