// Import
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json())

// GET Req
app.get('/', (req, res) => {
    res.send("Hello aaryan");
})

app.get('/name/:name', (req, res) => {
    const name = req.params.name;
    res.send("Your name is " + name);
})

// POST Req
app.post('/msg', (req, res) => {
    // {msg: "", senderId: 12}
    const msg = req.body.msg;
    const senderId = req.body.senderId;
    console.log(JSON.stringify(req.headers));
    res.json({
        status: 200,
        msg: "Message retreived successfully " + msg
    });
})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));