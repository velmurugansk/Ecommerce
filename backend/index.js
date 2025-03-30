const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const {dbConnection} = require('./utilis/database');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');


const corsOptions = {
    origin: 'http://localhost:5173', // Specify the frontend origin
    methods: ['GET', 'POST'],       // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true
};

dbConnection();

app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
