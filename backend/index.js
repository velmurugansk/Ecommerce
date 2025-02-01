const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {dbConnect} = require('./utiles/db');
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:5173', // Specify the frontend origin
    methods: ['GET', 'POST'],       // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json())
const port = process.env.PORT || 5000;
dbConnect();

const authRoute = require('./routes/authRoutes');

app.use('/api', authRoute);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port,()=> console.log(`server is running on port ${port}`));