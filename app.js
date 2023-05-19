const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');

const app = express();



//CONNECT DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connection Succesful.');
  })
  .catch((err) => {
    console.log(err);
  });




// TEMPLATE ENGINE
app.set('view engine', 'ejs');


// MIDDLEWARE
app.use(express.static('public'));
//-body den gelecek olan verileri yakalamak için bu iki middleware ı kullanırız
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json



 
app.use('/', pageRoute.routes);
app.use('/courses', courseRoute.routes);
app.use('/categories', categoryRoute.routes);



const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port} `);
});
