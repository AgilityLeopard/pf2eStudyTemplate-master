const express = require('express');

const app = express();

// 👇 ВАЖНО: создаём отдельный роутер ТОЛЬКО для API
const router = express.Router();

router.use(express.json());

const mountRoutes = require('./routes');

router.use((req, res, next) => {
  console.log("API HIT:", req.url);
  next();
});

mountRoutes(router);

// 👇 ТОЛЬКО /api будет обрабатываться Express
app.use('/api', router);

module.exports = app;