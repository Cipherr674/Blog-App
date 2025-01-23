const express = require('express');
const app = express();  
const morgan = require('morgan');
const cors = require('cors');



// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.use(cors());



require('dotenv').config();
require('./db/connection');


const blogroutes = require('./Router/server');
app.use('/server', blogroutes);



const userroute = require('./Router/userserver')
app.use('/userserver', userroute)





app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
