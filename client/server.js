const express = require('express');
// const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(__dirname + '/build'));
app.use(cors());
app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8081);