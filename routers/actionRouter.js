const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving actions.'
      });
    });
});

router.get('/:id', (req, res) => {
  Actions.get(req.params.id) 
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error retrieving action.'
      })
    })
})

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      if (project) {
        next();
      } else {
        res.status(404).json({
          message: 'Invalid project ID.'
        });
      }
    });
}

module.exports = router;