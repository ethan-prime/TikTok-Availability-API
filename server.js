const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
const tiktok_link = 'https://www.tiktok.com/@';

app.get('/available/:name', (req, res) => {
    const { name } = req.params;
    if(!name) {
        res.status(400).send({
            'message':'Please provide a name.'
        });
        return;
    }
    axios.get(`${tiktok_link}${name}`)
        .then((response) => {
            res.status(200).send({
                "available":"false"
            });
            return;
        })
        .catch((err) => {
            if(err.response.status == 429) {
                res.status(429).send({
                    "message":"Too many requests."
                });
                return;
            }
            res.status(200).send({
                "available":"true"
            });
            return;
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});