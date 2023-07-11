const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json')
  .then((data) => res.json(data))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  const { errors } = req.body
  const newDiag = {
    errors,
    error_id: uuidv4(),
    time: Date.now()
  }
  readAndAppend(newDiag, './db/diagnostics.json')
  res.json('Diagnostic added.')
});

module.exports = diagnostics;
