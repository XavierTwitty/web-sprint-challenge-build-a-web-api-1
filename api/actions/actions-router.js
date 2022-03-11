// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model')

const router = express.Router();

const {validateAct, validateActId}  = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Action.get()
        .then( action => {
            res.status(200).json(action)
        })
        .catch(next)
})


router.get('/:id', validateActId ,  (req, res ) => {
    res.json(req.action)
})

router.post('/', validateAct, (req, res, next) => {
    Action.insert(req.body)
        .then(action => {
        res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateAct, validateActId, (req, res, next) => {
    Action.update(req.params.id, req.body)
    .then(async () => {
      const updateAction = await Action.get(req.params.id);
      res.status(200).json(updateAction);
    })
    .catch(next);
})

router.delete('/:id' , validateActId, async (req, res, next) => {
    const deleteAction = await Action.get(req.params.id)
    Action.remove(req.params.id)
    .then(() => {
        res.status(200).json(deleteAction)
    })
    .catch(next)
})
module.exports = router