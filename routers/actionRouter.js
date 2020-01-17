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
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving action.'
      });
    });
});

router.post('/', validateProjectId, (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })  
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error saving action.'
      });
    });
});

router.put('/:id', validateProjectId, (req, res) => {
  const id = req.params.id;
  Actions.update(id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error updating action.'
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Actions.remove(id)
    .then(() => {
      res.status(200).json(id);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error deleting action.'
      });
    });
});

function validateProjectId(req, res, next) {
  const id = req.body.project_id;
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