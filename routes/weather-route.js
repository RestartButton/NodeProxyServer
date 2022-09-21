var express = require('express');
var router = express.Router();
const axios = require('axios').default;

require('dotenv').config()
//const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_BASE_URL, API_KEY_VALUE } = process.env;


router.post("/weather", async (req, res) => {
    const API_SERVICE_URL = `${API_BASE_URL}?lat=${req.body.lat}&lon=${req.body.lon}&lang=pt_br&appid=${API_KEY_VALUE}`;

    await axios.get(API_SERVICE_URL)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send({
                status: '500',
                message: err
            });
        });
    
});

module.exports = router;