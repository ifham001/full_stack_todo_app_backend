const express = require('express');
const authRouter = require("./routes/Auth-route");
const cors = require('cors');

const app = express();

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

app.use(express.json());


app.use(express.urlencoded({ extended: true }));        


app.get('/', (req, res) => {  
    res.send('Hello World!');
  })

app.use('/',authRouter)
 

module.exports = app;
