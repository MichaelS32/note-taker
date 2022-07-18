// importing express package
const express = require('express');

// creating express server
const app = express();

// use port assigned by heroku or use 3001
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTES
require('./routes/routes')(app);

app.listen(PORT, function() {
    console.log(`The app is listening on PORT :${PORT}`);
});