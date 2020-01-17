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

router.get('/:id', validateActionId, (req, res) => {
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

router.post('/', validateAction, validateProjectId, (req, res) => {
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

router.put('/:id', validateActionId, validateAction, validateProjectId, (req, res) => {
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

router.delete('/:id', validateActionId, (req, res) => {
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

function validateActionId(req, res, next) {
  const id = req.params.id;
  Actions.get(id)
    .then(action => {
      if (action) {
        next();
      } else {
        res.status(404).json({
          message: 'Invalid action ID.'
        });
      }
    });
}

function validateAction(req, res, next) {
  if (Object.entries(req.body).length > 0) {
    if (!req.body.project_id) {
      res.status(400).json({
        message: 'Missing required "project_id" field.'
      });
    } else if (!req.body.description) {
      res.status(400).json({
        message: 'Missing required "description" field.'
      });
    } else if (!req.body.notes) {
      res.status(400).json({
        message: 'Missing required "notes field.'
      });
    } else {
      next();
    }
  } else {
    res.status(400).json({
      message: 'Missing action data.'
    })
  }
}

module.exports = router;