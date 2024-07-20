const { Client } = require("pg");



const dbClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Bhopal@06",
    database: "test1"
  
 });
 module.exports =  dbClient;
