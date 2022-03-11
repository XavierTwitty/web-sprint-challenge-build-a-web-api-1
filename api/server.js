const express = require('express');
const server = express();
const cors = require('cors')
const {logger} = require('./projects/projects-middleware')
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')
// Configure your server here
server.use(cors())
server.use(express.json())

server.use('/api/actions', logger, actionRouter)

server.use('/api/projects', logger,  projectRouter)

server.get('/', logger,  (req, res) => {
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
