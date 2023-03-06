const express = require('express');
const database = require('./database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4201;

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/primario.route'));

app.listen(port);
console.log("Server started on port:", port);
