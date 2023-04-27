const mongoose = require('mongoose');
require('dotenv').config({path:'config/dev.env' });

const connectionURL = process.env.connectionURL;
mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});