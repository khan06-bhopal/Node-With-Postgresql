const dbClient = require("./connection/connection");
const app = require("./server/server");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send("Hello");
});

app.post('/test', (req, res) => {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    res.send("Total Sum is: " + sum);
});

app.post("/products", async (req, res) => {
    const { productName, quantity, price } = req.body;

    try {
        const _query = await dbClient.query(
            `INSERT INTO products (productName, quantity, price) VALUES ($1, $2, $3) RETURNING productId`,
            [productName, quantity, price]
        );

        res.status(201).send({
            message: "Message added successfully!",
            row_id: _query.rows[0].productId,
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send({
            message: "Something went wrong",
        });
    }
});

app.get("/products", async (req, res) => {
    try {
        const result = await dbClient.query('SELECT * FROM products');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send({
            message: "Something went wrong",
        });
    }
});
