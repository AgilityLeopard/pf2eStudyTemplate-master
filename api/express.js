const express = require('express');

const app = express();
const router = express.Router();

router.use(express.json());

const mountRoutes = require('./routes');

mountRoutes(router);

app.use('/api', router);

module.exports = {
  path: '/api',
  handler: app,
};