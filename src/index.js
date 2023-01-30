const ProductManager = require("../src/manager")
const express = require("express");


const prod = new ProductManager("products/products.json");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({extended: true}))

app.get("/products", async (request, response) =>{
    const {limit} = request.query;
    const consult = await prod.getProduct(parseInt(limit))
    response.send(consult); 
})

app.get("/products/:id", async (request, response) => {
    const {id} = request.params;
    const consult = await prod.getProductById(id)
    response.send(consult);
})

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
})