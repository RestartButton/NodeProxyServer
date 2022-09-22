var express = require('express');
var router = express.Router();
const axios = require('axios').default;

require('dotenv').config()
const { PLACE_BASE_URL, PLACE_KEY_VALUE } = process.env;

router.post('/place', async (req, res) => {
    const API_SERVICE_URL = `${PLACE_BASE_URL}?lat=${req.body.lat}&lon=${req.body.lon}&lang=pt&format=json&apiKey=${PLACE_KEY_VALUE}`;
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
    
})




module.exports = router;