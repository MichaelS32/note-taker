// importing express package
const express = require('express');
const fs = require('fs');
const path = require('path');

// creating express server
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTES
require('./routes/routes')(app);

app.listen(PORT, function() {
    console.log(`The app is listening on PORT :${PORT}`);
});