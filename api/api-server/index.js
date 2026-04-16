const express = require('express');
const app = express();

app.use(express.json());

const mountRoutes = require('./routes');
mountRoutes(app);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`API running on ${PORT}`);
});