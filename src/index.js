const express = require('express');
const morgan = require('morgan');
const path = require('path');

const {mongoose} = require('./database');


const app = express();

//settings
app.set('port', process.env.PORT || 3000); 

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks', require('./routes/task.routes'));

//Static Files
//console.log(__dirname + '/public');
//console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, ('public'))));

//Starting the server
app.listen(app.get('port'), () =>{
    console.log(`Server running on ${app.get('port')}`);
});