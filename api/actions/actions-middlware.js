// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActId(req, res, next) {

    try {
      const {id} = req.params
      const action = await Action.get(id)
    
      if (!action) {
        res.status(404).json({message: " action not found "})
      } else {
        req.action = action
        next()
      }
    } catch (err) {
      next(err)
    }
    }


    function validateAct(req, res, next) {

        if (!req.body.description || !req.body.notes || !req.body.project_id) {
          res.status(400).json({message: "missing required field"})
        } else {
          next()
        }
      
    }


    module.exports = {
        validateActId,
        validateAct,
    }