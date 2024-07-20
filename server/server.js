const express = require('express');
const app = express();
const port = 8080;

app.listen(port, (err) => {
    if (err) {
        console.log("Error while starting server!");
    } else {
        console.log("Server has been started at port " + port);
    }
});

module.exports = app;
