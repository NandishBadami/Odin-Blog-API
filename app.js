const express = require('express');
const route = require('./routes')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', route);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Listening on http://localhost:3000');
});