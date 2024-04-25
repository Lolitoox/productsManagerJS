const fs = require('fs/promises');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 0;
        this.status = true;
    }
//Función para iniciar el pruductData
    async initialize() {
        try {
            const productsData = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(productsData);
            this.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            console.error('Error al inicializar ProductManager:', error);
        }
    }
//Función para agregar productos
    addProduct(product) {
        product.id = ++this.id;
        this.products.push(product);
        this.saveProductsToFile();
    }
//Función para pedir productos con un limite
    getProducts(limit) {
        const limitedProducts = limit ? this.products.slice(0, parseInt(limit)) : this.products;
        return limitedProducts;
    }
//Función para buscar productos por id
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
//Función para actualizar productos
    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product => {
            if (product.id === id) {
                return { ...product, ...updatedProduct, id };
            }
            return product;
        });
        this.saveProductsToFile();
    }
//Función para borrar un producto
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProductsToFile();
    }
//Función para guardar los productos
    async saveProductsToFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.error('Error al guardar los productos en el archivo:', error);
        }
    }
}

module.exports = ProductManager;