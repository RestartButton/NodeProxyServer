const app = require('./app');
const http = require('http').createServer(app);

require('dotenv').config()
const { PORT, HOST } = process.env;

http.listen(PORT || 3000, () => {
    console.log(`Server listening at ${HOST}:${PORT}`);
});