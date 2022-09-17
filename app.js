const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const app = express();

const PORT = 3000;
const HOST = "localhost";
const { API_BASE_URL } = process.env;
const { API_KEY_VALUE }  =  process.env;
const API_SERVICE_URL = `${API_BASE_URL}?q=London&key=${API_KEY_VALUE}`;

app.use(morgan("dev"));

app.use(
    "/weather",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/weather": "",
        },
    })
);

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
})