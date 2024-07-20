const { Client } = require("pg");

const dbClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Bhopal@06",
    database: "test1"
});

dbClient.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error', err.stack));

module.exports = dbClient;
