const app = require('./app');
const db = require('./config/db');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Database Connection
db();
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;