const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

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



// GLOBAL VARİABLE
global.userIN = null;




// MIDDLEWARE
app.use(express.static('public'));
//-body den gelecek olan verileri yakalamak için bu iki middleware ı kullanırız
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(
  session({
    secret: 'mysecret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash(); // flashMessages değişkenini oluşturma sebebimiz ilgili templatede kullanabilmemiz için.
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);







app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute.routes);
app.use('/courses', courseRoute.routes);
app.use('/categories', categoryRoute.routes);
app.use('/users', userRoute.routes);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port} `);
});
