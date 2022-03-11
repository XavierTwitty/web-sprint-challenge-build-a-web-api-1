// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model')

const router = express.Router();

const { validateProjId, validateProj } = require('./projects-middleware')


router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id' , validateProjId,  (req, res) => {
    res.json(req.project)       
})

router.post('/', validateProj, (req, res , next) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(next)

})

router.put("/:id" , validateProj, validateProjId, (req, res, next) => {
    Project.update(req.params.id , req.body)
        .then( async () => {
            const updateProject = await Project.get(req.params.id)
            res.status(200).json(updateProject)
        })
        .catch(next)
    
})

router.delete("/:id", validateProjId, async (req, res , next) => {
    const deleteProject = await Project.get(req.params.id)
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json(deleteProject)
        })
        .catch(next)
})


router.get("/:id/actions", validateProjId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})
module.exports = router
