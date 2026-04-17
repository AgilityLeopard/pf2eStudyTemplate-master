const express = require('express');

const app = express();
app.use(express.json());

const mountRoutes = require('./routes');

app.use((req, res, next) => {
  console.log("API HIT:", req.url);
  next();
});

mountRoutes(app);

// 👇 ВОТ ЭТО ДОБАВЬ (самое важное)
app.use((req, res, next) => {
  // если Express не обработал запрос — отдай его обратно Nuxt
  next();
});

module.exports = {
  path: '/api',
  handler: app,
};