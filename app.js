const express = require('express');



const app = express();


// TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('foo', 'bar'); 



// MIDDLEWARE
app.use(express.static('public'));
// app.set(express.urlencoded({extended: true})); // urldeki datayı oku
// app.set(express.json()); // urldeki datayı json formatta oku


app.get('/', (req, res) => {
    res.status(200).render('index', {
        page_name: "index"
    });
  });

app.get('/about',(req, res) =>{
    res.status(200).render('about',{
        page_name: 'about'
    }); 
});

const port = 3000;
app.listen(port,()=>{
    console.log(`App started on port ${port} `);
});