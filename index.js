const dbClient = require("./connection/connection");
const app = require("./server/server") 

dbClient.connect();

const bodyParser = require('body-parser')
app.app.use(bodyParser.json());


app.app.get('/test' , function(req , res) { 

    res.send("Hello")
})

app.app.post('/test' , function(req , res) { 

    const sum = req.body.num1 + req.body.num2;
    res.send(" Total Sum is -: " + sum);
})


app.app.post("/gmp/Message", async (req, res) => {
   // console.log("🚀 ~ file: message.js:19 ~ app.app.post ~ res:", res);
    console.log("message id ", req.body);
    const {
        productName,
        quantity,
        price,
   
    } = req.body;
    try {
      const _query = await dbClient.query(
        `INSERT INTO products (productName,quantity, price) VALUES ($1, $2, $3) RETURNING productId`,
        [
            productName,
            quantity,
            price,
         
        ]
      );
      console.log("fullresponse id aa gyi hai---->", _query);
      res.status(201).send({
        message: "Message added successfully!",
        row_id: _query.rows[0].id,
      });
    } catch (error) {
      console.error("Error", error);
      res.status(500).send({
        message: "L44 something went wrong",
      });
    }
  });

  app.app.get("/gmp/Message", (req, res) => {
    console.log("ht");
    try {
        dbClient.query(
        `SELECT * FROM products`,
        (err, result) => {
          if (!err) {
            let _pa = JSON.stringify(result.rows);
            let _str = JSON.parse(_pa);
            res.status(200).json({ data: _str });
            console.log("🚀 ~ file: message.js:50 ~ client.query ~ _str:", _str);
          }
          console.log("🚀 ~ file: message.js:64 ~ gmpdbclient.query ~ err:", err);
        }
      );
    } catch (error) {
      console.log("🚀 ~ file: message.js:70 ~ app.app.get ~ error:", error);
      console.log(error);
    }
  });