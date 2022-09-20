const app = require('./require');

require('dotenv').config()
const { PORT, HOST } = process.env;

app.listen(PORT, HOST, () => {
    console.log(`Server listening at ${HOST}:${PORT}`);
});