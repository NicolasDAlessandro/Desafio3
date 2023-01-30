const { readFile,writeFile } = require("fs/promises")

class ProductManager{
    constructor(path){
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: products.length + 1
            }
            products.push(newProduct);
            writeFile(this.path,JSON.stringify(products));
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProduct( limit ){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            return limit == undefined ? products : products.slice(0, limit)
        } catch (error) {
            return error
        }
    }

    async getProductById(id){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const filterProduct = products.filter(prod => prod.id == id);
            return filterProduct
        } catch (error) {
            return error
        }
    }

    async updateProduct(title, description, price, thumbnail, code, stock){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const index = products.findIndex(prod => prod.id == id);
            const update = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: products[index].id
            }
            if(index !== -1){
                products[index] = update;
                writeFile(this.path,JSON.stringify(products))
                return"Product updated!"
            }else{
                return "Product not found!"
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const filterProducts = products.filter(prod => prod.id !== id);
            writeFile(this.path,JSON.stringify(filterProducts));
            return "Product deleted"
        } catch (error) {
            return error
        }
    }
}

module.exports = ProductManager;