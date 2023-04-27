require('dotenv').config({path:'config/dev.env'});
require('./db/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression')


//Declaring Variables
const port = process.env.PORT;

//Use Cors
app.use(cors());


//Configure Modules
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

//Configuring Routers
const adminUserRouter = require('../api/routes/SendMail');
app.use(adminUserRouter);


//Handling Errors
app.use((err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(port,()=>{
    console.log(`App Working on Port ${port}`);
})