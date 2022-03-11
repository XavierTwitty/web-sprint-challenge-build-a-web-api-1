// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then( action => {
            res.status(200).json(action)
        })
        .catch(next)
})

module.exports = router