// add middlewares here related to projects
const Project = require('./projects-model')


function logger(req, res, next) {
    console.log(`${req.method} request`)
    next()
  }

  async function validateProjId(req, res, next) {

    try {
      const {id} = req.params

      const project = await Project.get(id)
    
      if (!project) {
        res.status(404).json({message: " project not found "})
      } else {
        req.project = project
        next()
      }
    } catch (err) {
      next()
    }
    }

    function validateProj(req, res, next) {

        if (!req.body.description || !req.body.name || !req.body.completed) {
          res.status(400).json({message: "missing required field"})
        } else {
          next()
        }
      
    }



module.exports = {
    logger,
    validateProjId,
    validateProj,
}