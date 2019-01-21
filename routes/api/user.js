const express = require('express');
const Router = express.Router();

Router.get('/test', (req, res) => res.json({ message: 'User works!' }));
module.exports = Router;