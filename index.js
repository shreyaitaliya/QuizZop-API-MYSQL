const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors')

// const port = 8000;

const db = require('./config/db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', require('./routes/index'));

// Set up a basic home route for testing
app.get('/', (req, res) => {
    res.send('API is working!');
});

const port = process.env.PORT || 8000;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server Start Now On ${port}`);

})