const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()

const port = process.env.PORT || 5000;

const authRoute = require('./routes/authRoutes');

app.use('/api', authRoute);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port,()=> console.log(`server is running on port ${port}`));