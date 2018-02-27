const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Setup view engine
app.set('view engine', 'pug');

// Static resources
app.use(express.static(path.resolve(path.join(__dirname, '/public'))));

// API
const router = express.Router();

// Render pages
app.get('/', (req, res) => {
    // res.render('index', { title: 'Tempos' });
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Startup
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
});
