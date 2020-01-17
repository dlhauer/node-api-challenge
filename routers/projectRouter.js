const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving projects.'
      });
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving project.'
      });
    });
});

router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error saving project.'
      });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedProject = {
    id: id,
    name: req.body.name,
    description: req.body.description
  };
  Projects.update(id, updatedProject)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error updating project.'
      });
    });
});

module.exports = router;