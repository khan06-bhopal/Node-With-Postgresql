
const express = require('express')
const app = express();

const port = 8080;

app.listen(port , function(err) { 

    if(err){ 
        console.log(" Error while Starting server!")
    }
    else{ 
        console.log(" Server has been started at " + port)

    }
})

module.exports = {app}