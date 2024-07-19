// Import
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const app = express();
const PORT = process.env.PORT || 6000;
const PRODUCTS = require('./product');
app.use(bodyParser.json())

async function startServer() {
    const server = new ApolloServer({
        typeDefs: `
            type Product {
                id: ID!
                name: String!
                price: Float!
            }

            type Query {
                getProduct(id: ID!): Product
                getAllProducts: [Product]
            }
        `,
        resolvers: {
            Query: {
                getProduct: (parent, {id}) => PRODUCTS.find((product) => product.id == id),
                getAllProducts: () => PRODUCTS
            }
        }
    });
    await server.start();
    app.use('/graphql', expressMiddleware(server));
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
}

startServer()
/* 
// GET Req
app.get('/', (req, res) => {
    res.send("Hello aaryan");
})

app.get('/name/:name', (req, res) => {
    const name = req.params.name;
    res.send("Your name is " + name);
})

// POST Req
app.post('/msg', (req, res) => {
    // {msg: "", senderId: 12}
    const msg = req.body.msg;
    const senderId = req.body.senderId;
    console.log(JSON.stringify(req.headers));
    res.json({
        status: 200,
        msg: "Message retreived successfully " + msg
    });
}) */

